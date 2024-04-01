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
  
  
  userData: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = { ...data }; // Make a copy of the data to avoid modifying the original object
  
  }


  saveUser(): void {
    this.dialogRef.close(this.userData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
    


