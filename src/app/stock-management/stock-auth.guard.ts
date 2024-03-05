import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class stockAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isStockUser()) {
      return true;
    } else {
      // If not authenticated or not a staff member, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

