import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { supplierService } from '../supplierservice'; 
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
interface User {
  email: string;
}
@Component({
  selector: 'app-new-supplier-dialog',
  templateUrl: './new-supplier-dialog.component.html',
  styleUrls: ['./new-supplier-dialog.component.css']
})
export class newsupplierDialogComponent implements OnInit {
//   userForm!: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<newsupplierDialogComponent>,
//     private formBuilder: FormBuilder,
//     private userService: supplierService // Inject UserService
//   ) { }

//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       product: ['', Validators.required],
//       username: ['', Validators.required],
//       password: ['', Validators.required],

      
//     });
//   }

//   onSubmit() {
//     if (this.userForm.invalid) {
//       return;
//     }

//     const userDetails = {
//       name: this.userForm.value.name,
//       email: this.userForm.value.email,
//       product: this.userForm.value.role,
//       username: this.userForm.value.username,
//       password: this.userForm.value.password

//     };

//     this.userService.addUser(userDetails).subscribe(
//       response => {
//         console.log('User added successfully', response);
//         // Clear the form after successful submission
//         this.userForm.reset();
//         // Close the dialog after adding the user
//         this.dialogRef.close();
//       },
//       error => {
//         console.error('Error adding user:', error);
//       }
//     );
//   }

//   onCancelClick(): void {
//     this.dialogRef.close();
//   }
// }
userForm!: FormGroup;
  emailExists: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<newsupplierDialogComponent>,
    private userService: supplierService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      product: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  checkEmailExists() {
    const emailInput = this.userForm.get('email');
    console.log(emailInput);
    if (emailInput && emailInput.valid) { 
     const formData = { email: emailInput.value } as User;
    
      if (formData) { // Check if email is not empty
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa('admin:admin'),
          'Content-Type': 'application/json',
        });
  
        this.http.get('http://localhost:5984/user/43407ead14cf09630aa0d936af00f847', { headers })
          .subscribe(
            (existingFormData: any) => {
              const usersArray: any[][] = existingFormData.supplier || [];
  //             const emailExists = usersArray.some(users => users.some(supplier => supplier.email === formData.email));
  // console.log('email exists',emailExists);
  //             if (emailExists) {               
  //               this.errorMessage = 'Email already exists.';                
  //             } 
  //             else {
  //               this.errorMessage = '';
  //               if (emailInput) {
                  
  //                 emailInput.setErrors(null);
                
  //               }
  //             }
  const emailExists = usersArray.some(users => users.some(supplier => supplier.email === formData.email));
  console.log('email exists',emailExists);
              if (emailExists) {
                this.errorMessage = 'Supplier is already member';
console.log(this.errorMessage);
                if (emailInput) {
                  
                  emailInput.setErrors({ 'emailExists': true });
                }
              } else {
                this.errorMessage = '';
                if (emailInput) {
                 
                  emailInput.setErrors(null);
                }
              }
            },
            (error: HttpErrorResponse) => {
              this.errorMessage = 'Error fetching existing data.';
              console.error('Error fetching existing data:', error);
            }
          );
      }
    }
  }
  

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userDetails = this.userForm.value;

    this.userService.addUser(userDetails).subscribe(
      response => {
        console.log('supplier added successfully', response);
        alert('Supplier added successful');

        this.userForm.reset();
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

