
  // onSubmit(): void { // Remove the argument from onSubmit()
  //   this.data.addUser({ name: this.name, email: this.email, role: this.role });
  //   this.dialogRef.close();
  // }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }


  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef } from '@angular/material/dialog';
  import { UserService } from '../userService'; // Import UserService
  
  @Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-user-dialog.component.html',
    styleUrls: ['./add-user-dialog.component.css']
  })
  export class AddUserDialogComponent implements OnInit {
    userForm!: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<AddUserDialogComponent>,
      private formBuilder: FormBuilder,
      private userService: UserService // Inject UserService
    ) { }
  
    ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.userForm.invalid) {
        return;
      }
  
      const userDetails = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        role: this.userForm.value.role
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
  