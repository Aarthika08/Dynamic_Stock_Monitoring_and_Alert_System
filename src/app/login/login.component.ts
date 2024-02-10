// login.component.ts

 import { LoginService } from '../login/loginservice'
// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe(
        (isValid) => {
          if (isValid) {
            console.log('Login successful');
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.errorMessage = 'An error occurred during login';
        }
      );
    } else {
      this.errorMessage = 'Please enter valid email and password';
    }
  }
}
