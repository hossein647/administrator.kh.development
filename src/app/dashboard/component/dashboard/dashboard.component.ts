import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'adminPanel';
  display = true;
  currentRoute: string;

  constructor(
    private router: Router,
    ) {       
    }


  ngOnInit(): void {
    this.currentRoute = this.router.url.slice(11);
  }

  stateSidebar() {
    this.display = !this.display
  }

}
