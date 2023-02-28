import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selected: string;
  openDropdown = false;
  items: { faTitle: string; enTitle: string, icon: string }[];
  @Input() display: boolean;
  @Input() currentRoute: string;
  noneLists: { labelFA: string, labelEN: string, icon: string }[];
  
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuItemInit();
    this.selected = this.currentRoute;
    this.noneLists = [
      { labelFA: 'آپلود', labelEN: 'upload', icon: 'pi-cloud-upload' },
      { labelFA: 'قاری', labelEN: 'reciter', icon: 'pi-microphone' },
      { labelFA: 'کد تخفیف', labelEN: 'discount', icon: 'pi-gift' },
      { labelFA: 'اشتراک ویژه', labelEN: 'subscription', icon: 'pi-verified' },
      { labelFA: 'قوانین', labelEN: 'privacy', icon: 'pi-info-circle' },
    ]
  }


  onSelectedList(item: string) {
    this.selected = item;    
    this.router.navigate(['dashboard/' + item])
  }

  menuItemInit() {
    this.items = [
      { faTitle: 'صفحه اصلی', enTitle: 'main', icon: 'pi pi-home' },
      { faTitle: 'پرسش و پاسخ', enTitle: 'question-answer', icon: 'pi pi-question-circle' },
      { faTitle: 'تماس با ما', enTitle: 'contact-us', icon: 'pi pi-credit-card' },
      { faTitle: 'درباره ما', enTitle: 'about-us', icon: 'pi pi-users' },
    ]
  }

  onDropdownSite() {
    this.openDropdown = !this.openDropdown
  }
}
