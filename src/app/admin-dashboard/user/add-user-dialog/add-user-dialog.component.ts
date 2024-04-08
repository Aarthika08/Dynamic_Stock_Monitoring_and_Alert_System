
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../userService';
import * as CryptoJS from 'crypto-js';


interface User {
  email: string;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  emailExists: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  checkEmailExists() {
    const emailInput = this.userForm.get('email');
    console.log(emailInput);
    if (emailInput && emailInput.valid) { // Check if emailInput is not null
     const formData = { email: emailInput.value } as User;
    // if (emailInput && emailInput.valid) { // Check if emailInput is not null
    //   const email = emailInput.value.trim(); // Trim the email value
  
      if (formData) { // Check if email is not empty
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa('admin:admin'),
          'Content-Type': 'application/json',
        });
  
        this.http.get('http://localhost:5984/user/bc6902f68695a9119c060aede00060ca', { headers })
          .subscribe(
            (existingFormData: any) => {
              const usersArray: any[][] = existingFormData.user || [];
              const emailExists = usersArray.some(users => users.some(user => user.email === formData.email));
  console.log('email exists',emailExists);
              if (emailExists) {
                this.errorMessage = 'Email already exists.';
console.log(this.errorMessage);
                if (emailInput) {
                  
                  emailInput.setErrors({ 'emailExists': true });
                }
              } else {
                this.errorMessage = '';
                if (emailInput) {
                 
                  emailInput.setErrors(null);
                }
              }
            },
            (error: HttpErrorResponse) => {
              this.errorMessage = 'Error fetching existing data.';
              console.error('Error fetching existing data:', error);
            }
          );
      }
    }
  }
  

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userDetails = this.userForm.value;

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(userDetails.password, 'secret key').toString();
  
    userDetails.password = encryptedPassword;
  
    this.userService.addUser(userDetails).subscribe(
      response => {
        console.log('User added successfully', response);
        alert('User added successful');
        this.userForm.reset();
        this.dialogRef.close();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

