import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/userService';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component'; // Import the dialog component
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  //  users!: any[];
  editingUserIndex: number = -1;
  updatedUserData: any = {}; // Object to hold updated user data

  
  // sort,search and filter
  users: any[] = []; // Array of users
  
  
 


  constructor(private dialog: MatDialog,private formBuilder: FormBuilder, private userService: UserService) { 

    
  }

  ngOnInit(): void {
   
    // this.loadUsers();
    this.fetchUsers();

  }
  // Method to filter users based on search query
 

 

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
    width:'700px',
      
      data: {} // Optionally, pass data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: any) => { // Explicitly specify the type of result
      console.log('The dialog was closed');
    });
  }
  //to retireve 
 

  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     users => {
  //       this.users = users;
  //       console.log('Users loaded successfully:', this.users);
  //     },
  //     error => {
  //       console.error('Error loading users:', error);
  //     }
  //   );
  // }

  //to edit
  editUser(index: number): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: this.users[index][0] // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.updateUser(index, updatedUserData);
      }
    });
  }

  updateUser(index: number, updatedUserData: any): void {
    if (this.userForm.invalid) {
      alert('Invalid! Please check your fields.');
      return;
    }
    if (updatedUserData.password !== this.users[index][0].password) {
      // Encrypt the new password
      const encryptedPassword = CryptoJS.AES.encrypt(updatedUserData.password, 'secret key').toString();
      // Update the password in the updatedUserData object
      updatedUserData.password = encryptedPassword;
    }
    
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
  // deleteUser(index: number) {
  //   this.userService.deleteUser(index).subscribe(
  //     response => {
  //       console.log('User deleted successfully:', response);
  //       // Reload users after deletion
  //       this.loadUsers();
  //     },
  //     error => {
  //       console.error('Error deleting user:', error);
  //     }
  //   );
  // }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        // Filter out deleted users
        this.users = data.filter(user => !user.deleted);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  
  
  // softDeleteUser(userId: number): void {
    // softDeleteUser(outerIndex: number, innerIndex: number): void {
    //   this.users[outerIndex][innerIndex][0].deleted = true;}

    // const index = this.users.findIndex(user => user.id === outerIndex);
    // if (index !== -1) {
      // this.users.splice(index, 1);
      // this.users[outerIndex].splice(innerIndex, 1);

   // }
   softDeleteUser(outerIndex: number, innerIndex: number): void {
    console.log('Deleting user at indices:', outerIndex, innerIndex);
    if (this.users[outerIndex] && this.users[outerIndex][0]) {
      // Toggle the 'deleted' property
      this.users[outerIndex][0].deleted = true;
      // Call service to update the database
      this.userService.deleteUser(outerIndex).subscribe(
        () => {
          console.log('User deleted successfully');
        },
        error => {
          console.error('Error deleting user:', error);
          // Revert the change if there's an error
          this.users[outerIndex][0].deleted = false;
        }
      );
    } else {
      console.log('User not found at indices:', outerIndex, innerIndex);
    }
  }
  
  

  
  

  }
