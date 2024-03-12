
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isrealUser()) {
      return true;
    } else {
      // If not authenticated or not a manager, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}




