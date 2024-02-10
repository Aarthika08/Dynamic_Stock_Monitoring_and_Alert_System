import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { catchError,switchMap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class supplierService {

  private couchDBUrl = 'http://localhost:5984/user/43407ead14cf09630aa0d936af00f847'; // Update with your document ID

  constructor(private http: HttpClient) { }

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
        throw error;
      }),
      // Append the new user data to the existing user array
      map((document: any) => {
        document.supplier.push([userDetails]); // Assuming user details are pushed as an array
        return document;
      }),
      // Update the document in CouchDB
      switchMap((updatedDocument: any) => {
        return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
      }),
      catchError(error => {
        console.error('Error updating document:', error);
        throw error;
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
        return document.supplier || []; // Return the 'user' array, or an empty array if not found
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
        document.supplier[userIndex][0] = updatedUserData; // Assuming user details are stored as an array of arrays
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
  //to delte 

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
        document.supplier.splice(userIndex, 1); // Remove user data at the specified index
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