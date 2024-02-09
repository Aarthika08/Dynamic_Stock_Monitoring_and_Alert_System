// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService } from '../userService';

// @Component({
//   selector: 'app-update-user-dialog',
//   templateUrl: './update-user-dialog.component.html',
//   styleUrls: ['./update-user-dialog.component.css']
// })
// export class UpdateUserDialogComponent {
//   updateUserForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.updateUserForm = this.formBuilder.group({
//       name: [data.document.name, Validators.required],
//       email: [data.document.email, [Validators.required, Validators.email]],
//       role: [data.document.role, Validators.required]
//     });
//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     if (this.updateUserForm.valid) {
//       const updatedUserData = this.updateUserForm.value;
//       const documentId = this.data.document._id;
      
//       this.userService.updateDocument(documentId, updatedUserData).subscribe(
//         (response: any) => {
//           console.log('Document updated successfully:', response);
//           this.dialogRef.close({ success: true });
//         },
//         (error) => {
//           console.error('Error updating document:', error);
//           this.dialogRef.close({ success: false, error: error });
//         }
//       );
//     }
//   }
// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  userData: any; // Define userData property

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data;
  }

  saveUser(): void {
    // Implement saveUser logic here
    console.log('Saving user:', this.userData);
    // Close the dialog
    this.dialogRef.close();
  }

  closeDialog(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}