import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { supplierService } from '../supplierservice'; // Import UserService

@Component({
  selector: 'app-new-supplier-dialog',
  templateUrl: './new-supplier-dialog.component.html',
  styleUrls: ['./new-supplier-dialog.component.css']
})
export class newsupplierDialogComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<newsupplierDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: supplierService // Inject UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],

      
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userDetails = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      username: this.userForm.value.username,
      password: this.userForm.value.password

    };

    this.userService.addUser(userDetails).subscribe(
      response => {
        console.log('User added successfully', response);
        // Clear the form after successful submission
        this.userForm.reset();
        // Close the dialog after adding the user
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
