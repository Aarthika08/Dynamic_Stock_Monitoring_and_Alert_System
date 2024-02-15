import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { catchError,switchMap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private couchDBUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca'; // Update with your document ID
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  // addUser(userDetails: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + btoa('admin:admin') 
  //     })
  //   };

  //   return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
  //     catchError(error => {
  //       console.error('Error fetching document:', error);
  //       throw error;
  //     }),
  //     // Append the new user data to the existing user array
  //     map((document: any) => {
  //       document.user.push([userDetails]); // Assuming user details are pushed as an array
  //       return document;
  //     }),
  //     // Update the document in CouchDB
  //     switchMap((updatedDocument: any) => {
  //       return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
  //     }),
  //     catchError(error => {
  //       console.error('Error updating document:', error);
  //       throw error;
  //     })
  //   );
  // }
 
  // addUser(userDetails: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + btoa('admin:admin') 
  //     })
  //   };
  
  //   return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
  //     catchError(error => {
  //       console.error('Error fetching document:', error);
  //       throw error;
  //     }),
  //     switchMap((document: any) => {
        
  //       const usersArray: any[] = document.user || [];

  //       const emailExists = usersArray.some((user: any[]) => user.some(u => u.email === userDetails.email));

  //       if (emailExists) {
  //         return throwError('Email already exists');
  //       } else {
  //         document.user.push([userDetails]); // Assuming user details are pushed as an array
  //         return this.http.put<any>(this.couchDBUrl, document, httpOptions);
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error updating document:', error);
  //       throw error;
  //     })
  //   );
  // }
  addUser(userDetails: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin') 
      })
    };
  
    return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        return throwError('Error fetching document');
      }),
      switchMap((document: any) => {
        const usersArray: any[] = document.user || [];
        const emailExists = usersArray.some(userArray => {
          return userArray.some((user: any) => user.email === userDetails.email); // Specify the type of `user` parameter
        });
  
        if (emailExists) {
          return throwError('Email already exists');
        } else {
          usersArray.push([userDetails]);
  
          document.user = usersArray;
  
          return this.http.put<any>(this.couchDBUrl, document, httpOptions).pipe(
            catchError(error => {
              console.error('Error updating document:', error);
              return throwError('Error updating document');
            }),
            map(() => userDetails) // Return userDetails if successful
          );
        }
      })
    );
  }
  

  //to retrieve the data from the database 

  getUsers(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin') 
      })
    };

    return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        throw error;
      }),
      // Extract and return the 'user' array from the document
      map((document: any) => {
        return document.user || []; // Return the 'user' array, or an empty array if not found
      })
    );
  }

  //to update 
  updateUser(userIndex: number, updatedUserData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        return throwError(error);
      }),
      // Update the user data in the document
      map((document: any) => {
        document.user[userIndex][0] = updatedUserData; // Assuming user details are stored as an array of arrays
        return document;
      }),
      // Save the updated document back to CouchDB
      switchMap((updatedDocument: any) => {
        return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
      }),
      catchError(error => {
        console.error('Error updating document:', error);
        return throwError(error);
      })
    );
  }
  //to delete 

  deleteUser(userIndex: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin') 
      })
    };

    return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        throw error;
      }),
      // Remove the user data from the document
      map((document: any) => {
        document.user.splice(userIndex, 1); // Remove user data at the specified index
        return document;
      }),
      // Save the updated document back to CouchDB
      switchMap((updatedDocument: any) => {
        return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
      }),
      catchError(error => {
        console.error('Error updating document:', error);
        throw error;
      })
    );
  }
    }