
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // You need to implement AuthService to manage authentication state

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

        constructor(private authService: AuthService, private router: Router) {}
      
        canActivate(): boolean {
          if (!this.authService.isAuthenticated()) {
            // If not authenticated, navigate to the login page
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }
}
