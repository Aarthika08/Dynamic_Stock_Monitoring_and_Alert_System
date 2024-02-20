
import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private isLoggedIn = false;
    private isAdmin = false; // Assuming isAdmin property to determine admin status
  
  
    login() {
      this.isLoggedIn = true;     
      this.isAdmin = true;
    }
  
    logout() {
      this.isLoggedIn = false;
      this.isAdmin = false; 
    }
  
    isAuthenticated(): boolean {
      return this.isLoggedIn;
    }
  
    isAdminUser(): boolean {
      return this.isAdmin;
    }
  }
  