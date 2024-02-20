// update-user-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { supplierService } from '../supplierservice'; 


interface UserData {
  name: string;
  email: string;
  username: string;
  password: string;
  product: string;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class updateUserDialogComponent {
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<updateUserDialogComponent>,
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
