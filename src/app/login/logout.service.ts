import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
            sessionStorage.clear();
             history.pushState(null, '', '/login');
            this.router.navigate(['/login']);     
            // Redirect to the login page
            window.location.href = '/login';
  }
}
