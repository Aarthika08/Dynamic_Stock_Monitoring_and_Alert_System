// update-user-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
