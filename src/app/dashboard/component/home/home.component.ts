import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  cards: { title: string; num: number | string }[];
  chartData: any;
  recitersLength = 0;
  translationsLength = 0;
  tafsirsLength = 0;
  usersLength = 0;
  price: number = 0;
  total = 0;
  tafsirPerMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private applicationService: ApplicationService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    
    this.getPriceSubscription();
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
      { title: 'قاری', num: this.recitersLength },
      { title: 'ترجمه', num: this.translationsLength },
      { title: 'تفسیر', num: this.tafsirsLength },
      { title: 'کاربر ویژه', num: this.usersLength },
      { title: 'فروش', num: this.total }
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
          this.usersLength = res.users.length;        
          this.total = this.usersLength * this.price;
          this.initCards(); // detect change value all cards after render view
        }
      }
    )
  }



  getPriceSubscription() {
    this.homeService.getPrice().subscribe(
      res => {                
        if (res?.subscription) this.price = Number(res.subscription.amount);        
      }
    )
  }
}