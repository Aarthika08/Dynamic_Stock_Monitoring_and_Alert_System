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
  errorMessage: string = '';

  constructor(private authService: AdminAuthService) {}

  login(): void {
    this.authService.authenticate(this.username, this.password)
      .then((authenticated: boolean) => {
        if (authenticated) {
          this.errorMessage = '';
          // Redirect or perform other actions upon successful authentication
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      })
      .catch((error: any) => {
        console.error('Authentication Error:', error);
        this.errorMessage = 'An error occurred during authentication';
      });
  }
}
