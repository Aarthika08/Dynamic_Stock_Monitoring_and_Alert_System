// login.component.ts

import { Component } from '@angular/core';
import { AdminAuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AdminAuthService) {}

  async login() {
    const isAuthenticated = await this.authService.authenticate(this.username, this.password);
    if (isAuthenticated) {
      console.log('Login successful');
      // Redirect or perform further actions upon successful authentication
    } else {
      console.log('Invalid credentials');
      // Optionally display an error message to the user
    }
  }
}
