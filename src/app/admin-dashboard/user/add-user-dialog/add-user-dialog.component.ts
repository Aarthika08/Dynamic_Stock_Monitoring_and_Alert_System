
  // // onSubmit(): void { // Remove the argument from onSubmit()
  // //   this.data.addUser({ name: this.name, email: this.email, role: this.role });
  // //   this.dialogRef.close();
  // // }

  // // closeDialog(): void {
  // //   this.dialogRef.close();
  // // }


  // import { Component, OnInit } from '@angular/core';
  // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  // import { MatDialogRef } from '@angular/material/dialog';
  // import { UserService } from '../userService'; // Import UserService

  // @Component({
  //   selector: 'app-add-user-dialog',
  //   templateUrl: './add-user-dialog.component.html',
  //   styleUrls: ['./add-user-dialog.component.css']
  // })
  // export class AddUserDialogComponent implements OnInit {
  //   userForm!: FormGroup;
  //   emailExists: boolean = false;

  //   constructor(
  //     public dialogRef: MatDialogRef<AddUserDialogComponent>,
  //     private formBuilder: FormBuilder,
  //     private userService: UserService // Inject UserService
  //   ) { }
  
  //   ngOnInit(): void {
      
  //     this.userForm = this.formBuilder.group({
  //       name: ['', Validators.required],
  //       email: ['', [Validators.required, Validators.email]],
  //       role: ['', Validators.required],
  //       username: ['', Validators.required],
  //       password: ['', Validators.required],

        
  //     });
  //   }
  
  //   onSubmit() {
  //     if (this.userForm.invalid) {
  //       return;
  //     }
    
  
  //     // const userDetails = {
  //     //   name: this.userForm.value.name,
  //     //   email: this.userForm.value.email,
  //     //   role: this.userForm.value.role,
  //     //   username: this.userForm.value.username,
  //     //   password: this.userForm.value.password

  //     // };
  //     const userDetails = this.userForm.value;

  //     this.userService.addUser(userDetails).subscribe(
  //       response => {
  //         console.log('User added successfully', response);

  //         this.userForm.reset();
  //         this.dialogRef.close();
  //       },
  //       error => {
  //         console.error('Error adding user:', error);
  //         this.emailExists = true;


  //       }
  //     );
  //   }
  
  //   onCancelClick(): void {
  //     this.dialogRef.close();
  //   }
  // }
  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../userService';

interface User {
  email: string;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  emailExists: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // checkEmailExists() {
  //   const emailControl = this.userForm.get('email');
  //   // if (emailControl && emailControl.valid) { // Check if emailInput is not null
  //   //   const formData = { emailId: emailControl.value } as User;
  //   if (emailControl && emailControl.valid) {
  //     const email = emailControl.value.trim();
      
  //     if (email) {
  //       const headers = new HttpHeaders({
  //         'Authorization': 'Basic ' + btoa('admin:admin'),
  //         'Content-Type': 'application/json',
  //       });

  //       this.http.get('http://localhost:5984/user/bc6902f68695a9119c060aede00060ca', { headers }).subscribe(
  //         (existingFormData: any) => {
  //           const usersArray: User[] = existingFormData.user || [];
  //           const emailExists = usersArray.some((user: User) => user.emailId === email);

  //           if (emailExists) {
  //             this.errorMessage = 'Email already exists.';
  //           } else {
  //             this.errorMessage = '';
  //           }
  //         },
  //         (error: HttpErrorResponse) => {
  //           this.errorMessage = 'Error fetching existing data.';
  //           console.error('Error fetching existing data:', error);
  //         }
  //       );
  //     }
  //   }
  // }


  checkEmailExists() {
    const emailInput = this.userForm.get('email');
    console.log(emailInput);
    if (emailInput && emailInput.valid) { // Check if emailInput is not null
     const formData = { email: emailInput.value } as User;
    // if (emailInput && emailInput.valid) { // Check if emailInput is not null
    //   const email = emailInput.value.trim(); // Trim the email value
  
      if (formData) { // Check if email is not empty
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa('admin:admin'),
          'Content-Type': 'application/json',
        });
  
        this.http.get('http://localhost:5984/user/bc6902f68695a9119c060aede00060ca', { headers })
          .subscribe(
            (existingFormData: any) => {
              const usersArray: any[][] = existingFormData.user || [];
              const emailExists = usersArray.some(users => users.some(user => user.email === formData.email));
  console.log('emaile exists',emailExists);
              if (emailExists) {
                this.errorMessage = 'Email already exists.';
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
        console.log('User added successfully', response);
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

