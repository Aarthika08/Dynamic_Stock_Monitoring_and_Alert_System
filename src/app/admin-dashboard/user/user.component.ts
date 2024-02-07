import { Component  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  name!: string;
  email!: string;
  role!: string;
  users: any[] = [];
 
  constructor(private http: HttpClient,public dialog: MatDialog) {}

 
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {width: '50px',
      data: {
        addUser: this.addUser.bind(this) // Pass a reference to the addUser() method
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  addUser(userData: any): void {
    
    // const userData = {name: this.name, email: this.email, role: this.role};
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
    this.http.post<any>('http://localhost:5984/user', userData, { headers: headers })
      .subscribe(
        response => {
          console.log('User added successfully:', response);
          alert('User added successfully!');
          // Optionally, redirect to another page or perform additional actions
        },
        error => {
          console.error('Error adding user:', error);
          alert('Error adding user. Please try again.');
          // Display error message or perform error handling
        }
      );
  }
}