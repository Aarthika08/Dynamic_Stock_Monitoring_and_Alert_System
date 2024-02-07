import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  name: string = '';
  email: string = '';
  role: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void { // Remove the argument from onSubmit()
    this.data.addUser({ name: this.name, email: this.email, role: this.role });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
