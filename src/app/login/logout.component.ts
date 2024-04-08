import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LogoutService} from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService,private router: Router) { }


  ngOnInit(): void {
    this.logout();
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
  }
  logout(): void {
    this.logoutService.logout();
  }


}
