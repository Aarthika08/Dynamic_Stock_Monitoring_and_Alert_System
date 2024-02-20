import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdminUser()) {
      return true;
    } else {
      // If not authenticated or not an admin, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
