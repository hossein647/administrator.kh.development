import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() sidebarState = new EventEmitter<boolean>();
  content: MenuItem[];

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.content = [
      { label: 'پروفایل', icon: 'pi pi-cog', command: () => this.profile(), routerLink: 'profile' },
      { label: 'خروج', icon: 'pi pi-power-off', command: () => this.logout() }
    ]
  }



  profile(): void {
    
  }



  showSidebar(event: any) {
    this.sidebarState.emit();
  }



  logout() {
    this.loginService.logout().subscribe(
      res => {
        if (res) {
          if (!res.loggedIn) this.router.navigate(['login']);
        }
      }
    )
  }
}
