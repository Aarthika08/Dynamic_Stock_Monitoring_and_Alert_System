import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { newsupplierDialogComponent } from './new-supplier-dialog/new-supplier-dialog.component'; // Import the dialog component
import {updateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { supplierService } from './supplierservice';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
    userForm!: FormGroup;
    users!: any[];
    editingUserIndex: number = -1;
    updatedUserData: any = {}; // Object to hold updated user data
  
  
    constructor(private dialog: MatDialog,private formBuilder: FormBuilder, private supplierservice: supplierService) { }
  
    ngOnInit(): void {
      
      this.loadUsers();
    }
    openAddUserDialog(): void {
      const dialogRef = this.dialog.open(newsupplierDialogComponent, {
        width: '250px',
        data: {} // Optionally, pass data to the dialog
      });
  
      dialogRef.afterClosed().subscribe((result: any) => { // Explicitly specify the type of result
        console.log('The dialog was closed');
      });
    }
    //to retireve 
   
  
    loadUsers() {
      this.supplierservice.getUsers().subscribe(
        users => {
          this.users = users;
          console.log('supplier loaded successfully:', this.users);
        },
        error => {
          console.error('Error loading supplier:', error);
        }
      );
    }
  
    //to edit
    editUser(index: number): void {
      const dialogRef = this.dialog.open(updateUserDialogComponent, {
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
      this.supplierservice.updateUser(index, updatedUserData).subscribe(
        response => {
          console.log('supplier updated successfully:', response);
          // Handle any action after successful update if needed
        },
        error => {
          console.error('Error updating supplier:', error);
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
      this.supplierservice.deleteUser(index).subscribe(
        response => {
          console.log('Supplier deleted successfully:', response);
          // Reload users after deletion
          this.loadUsers();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  
