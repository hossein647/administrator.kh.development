import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { HomeService } from './home.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  cards: { title: string; num: number | string }[];
  chartData: any;
  recitersLength: number;
  translationsLength: number;
  tafsirsLength: number;
  usersLength: number;
  total: string;
  tafsirPerMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private applicationService: ApplicationService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    
    this.getTotalSales();
    this.getReciters();
    this.getTranslations();
    this.getTafsirs();
    this.getSuperUsers();
    this.initCards();
    
  }



  initChartData() {         
          
    this.chartData = {
      labels: [
        'فروردین', 'اردیبهشت', 'خرداد',
        'تیر', 'مرداد', 'شهریور', 'مهر',
        'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      datasets: [
        {
          label: 'تفسیر',
          data: this.tafsirPerMonth
        }
      ]
    }      
  }



  calculateTafsirsPerMonth(tafsirs: any[]) {
    let counter: any = {}
    let enMonth: number;

    tafsirs.forEach((tafsir: any) => {

      // convert to persian month
      const thisYear = new Date().toLocaleString('fa-IR', { year: 'numeric' })
      const year = new Date(tafsir.createdAt).toLocaleString('fa-IR', { year: 'numeric' });
      let month: string = new Date(tafsir.createdAt).toLocaleString('fa-IR', { month: 'numeric' });
      
      
      if (year === thisYear) {
        enMonth = +this.latinDigit(month)
        counter[enMonth] = (counter[enMonth] || 0) + 1;
        this.tafsirPerMonth[enMonth - 1] = counter[enMonth]        
        }
      })
  }



  // convert persian month to digit latin
  latinDigit(s: any) {
    return s.replace(
      /[\u0660-\u0669\u06f0-\u06f9]/g,    // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
      function (a: any) { return a.charCodeAt(0) & 0xf }     // Remove the Unicode base(2) range that not match
    )
  }


  initCards() {    
    this.cards = [
      { title: 'قاری', num: this.recitersLength || 0 },
      { title: 'ترجمه', num: this.translationsLength || 0 },
      { title: 'تفسیر', num: this.tafsirsLength || 0 },
      { title: 'کاربر ویژه', num: this.usersLength || 0 },
      { title: 'فروش', num: this.total || 0 }
    ]
  }



  getReciters() {
    this.applicationService.reciters().subscribe(
      res => {
        if (res?.reciters) {          
          this.recitersLength = res.reciters.length;
        }
      }
    )
  }



  getTranslations() {
    this.applicationService.translations().subscribe(
      res => {
        if (res?.translations) {          
          this.translationsLength = res.translations.length;
        }
      }
    )
  }



  getTafsirs() {
    this.applicationService.tafsirs().subscribe(
      res => {
        if (res?.tafsirs) {
          this.tafsirsLength = res.tafsirs.length;
          this.calculateTafsirsPerMonth(res.tafsirs);
          this.initChartData();          
        }
      }
    )
  }



  getSuperUsers() {
    this.applicationService.superUsers().subscribe(
      res => {                
        if (res?.users) {
          this.initCards(); // detect change value all cards after render view
        }
      }
    )
  }



  getTotalSales() {
    this.homeService.totalSales().subscribe({
      next: (res: any) => {
        if (res.pay.length) {
          const totalRial: number = res.pay[0]?.total;          
          const totalToman: number = +totalRial.toString().slice(0, -1);
          this.total = totalToman.toLocaleString(); // 3digit separate
          
        }
      },
      error: (err) => {        
      }
    })
  }
}