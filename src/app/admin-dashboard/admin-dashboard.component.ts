// admin-dashboard.component.ts

import { Component } from '@angular/core';
import { LogoutService } from '../login/logout.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  // Component logic goes here
  sidebarOpen: boolean = false;
  constructor(private logoutService: LogoutService) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  logout(): void {
    this.logoutService.logout();
  }

}