import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Perform logout actions (clear session, tokens, etc.)
    sessionStorage.clear(); // Clear session data

    // Manipulate browser history to prevent back navigation to authenticated pages
    history.pushState(null, '', '/login');

    // Redirect to the login page
    window.location.href = '/login';
  }
}
