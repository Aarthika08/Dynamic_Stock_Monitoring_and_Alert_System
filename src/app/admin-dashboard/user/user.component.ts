import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/userService';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component'; // Import the dialog component
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users!: any[];
  editingUserIndex: number = -1;
  updatedUserData: any = {}; // Object to hold updated user data


  constructor(private dialog: MatDialog,private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
   
    this.loadUsers();

  }
  
  // onSubmit() {
  //   if (this.userForm.invalid) {
  //     return;
  //   }

  //   const userDetails = {
  //     name: this.userForm.value.name,
  //     email: this.userForm.value.email,
  //     role: this.userForm.value.role
  //   };

  //   this.userService.addUser(userDetails).subscribe(
  //     response => {
  //       console.log('User added successfully', response);
  //       // Clear the form after successful submission
  //       this.userForm.reset();
  //     },
  //     error => {
  //       console.error('Error adding user:', error);
  //     }
  //   );
  // }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '250px',
      data: {} // Optionally, pass data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: any) => { // Explicitly specify the type of result
      console.log('The dialog was closed');
    });
  }
  //to retireve 
 

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log('Users loaded successfully:', this.users);
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  //to edit
  editUser(index: number): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: this.users[index][0] // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.updateUser(index, updatedUserData);
      }
    });
  }

  updateUser(index: number, updatedUserData: any): void {
    this.userService.updateUser(index, updatedUserData).subscribe(
      response => {
        console.log('User updated successfully:', response);
        // Handle any action after successful update if needed
      },
      error => {
        console.error('Error updating user:', error);
        // Handle error if needed
      }
    );
  }
  cancelEdit(): void {
    this.editingUserIndex = -1;
    this.updatedUserData = {};
  }
 


  
//to delete
  deleteUser(index: number) {
    this.userService.deleteUser(index).subscribe(
      response => {
        console.log('User deleted successfully:', response);
        // Reload users after deletion
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
