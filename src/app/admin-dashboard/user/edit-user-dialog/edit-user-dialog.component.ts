// edit-user-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../userService';
import * as CryptoJS from 'crypto-js';

interface UserData {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  // userData: UserData;
  // userForm!: FormGroup;
  // emailExists: boolean = false;
  // errorMessage: string = '';

  // constructor(  
  //   private fb: FormBuilder,
  //   private http: HttpClient,
  //   public dialogRef: MatDialogRef<EditUserDialogComponent>,
  //   private userService: UserService,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {
  //   this.userData = { ...data }; // Make a copy of the data to avoid modifying the original object
  //   // Initialize form controls
  //   this.userForm = this.fb.group({
  //     name: [this.userData.name, Validators.required],
  //     email: [this.userData.email, [Validators.required, Validators.email]],
  //     username: [this.userData.username, Validators.required],
  //     password: [this.userData.password, Validators.required],
  //     role: [this.userData.role, Validators.required]
  //   });
  // }

  

  // saveUser(): void {
  //   this.dialogRef.close(this.userData);
  // }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }
  

  // checkEmailExists(): void {
  //   const emailInput = this.userForm.get('email');
  
  //   if (emailInput && emailInput.valid) {
  //     const formData = { email: emailInput.value } as UserData;
  
  //     if (formData) {
  //       const headers = new HttpHeaders({
  //         'Authorization': 'Basic ' + btoa('admin:admin'),
  //         'Content-Type': 'application/json',
  //       });
  
  //       this.http.get('http://localhost:5984/user/bc6902f68695a9119c060aede00060ca', { headers })
  //         .subscribe(
  //           (existingFormData: any) => {
  //             const usersArray: any[][] = existingFormData.user || [];
  //             const emailExists = usersArray.some(users => users.some(user => user.email === formData.email));
  
  //             if (emailExists) {
  //               this.errorMessage = 'Email already exists.';
  //               if (emailInput) {
  //                 emailInput.setErrors({ 'emailExists': true });
  //               }
  //             } else {
  //               this.errorMessage = '';
  //               if (emailInput) {
  //                 emailInput.setErrors(null);
  //               }
  //             }
  //           },
  //           (error: HttpErrorResponse) => {
  //             this.errorMessage = 'Error fetching existing data.';
  //             console.error('Error fetching existing data:', error);
  //           }
  //         );
  //     }
  //   }
  // }
  
  userData: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = { ...data }; // Make a copy of the data to avoid modifying the original object
  
  }

  

  saveUser(): void {
    // Pass the updated user data back to the parent component
    this.dialogRef.close(this.userData);
  }

  closeDialog(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
    


