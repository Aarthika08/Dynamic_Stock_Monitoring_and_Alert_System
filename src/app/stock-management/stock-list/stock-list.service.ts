import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { catchError,switchMap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class stocksService {

  private couchDBUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d';

  errorMessage: string = '';

  constructor(private http: HttpClient) { }


  addstock(stockDetails: any): Observable<any> {
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
        const stockArray: any[] = document.stocklist || [];
        // const emailExists = usersArray.some(userArray => {
        //   return userArray.some((user: any) => user.email === stockDetails.email); // Specify the type of `user` parameter
        // });
  
        // if (emailExists) {
        //   return throwError('Email already exists');
        // } else {
            stockArray.push([stockDetails]);
  
          document.stocklist = stockArray;
  
          return this.http.put<any>(this.couchDBUrl, document, httpOptions).pipe(
            catchError(error => {
              console.error('Error updating document:', error);
              return throwError('Error updating document');
            }),
            map(() => stockDetails) // Return userDetails if successful
          );
        
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
        return document.stocklist || []; // Return the 'user' array, or an empty array if not found
      })
    );
  }




  //to update correct code 
//   updateUser(userIndex: number, updatedUserData: any): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };

//     return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
//       catchError(error => {
//         console.error('Error fetching document:', error);
//         return throwError(error);
//       }),
//       map((document: any) => {
//         document.user[userIndex][0] = updatedUserData; // Assuming user details are stored as an array of arrays
//         return document;
//       }),
//       switchMap((updatedDocument: any) => {
        
//         return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
//       }),
//       catchError(error => {
//         console.error('Error updating document:', error);
//         return throwError(error);
//       })
//     );
//   }

//   //to delete for soft  delete 

//   deleteUser(userIndex: number): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };
//     return this.http.get<any>(this.couchDBUrl,httpOptions).pipe(
//       catchError(error => {
//         console.error('Error fetching document:', error);
//         throw error;
//       }),
//       map((document: any) => {
//         document.user[userIndex][0].deleted = true; // Soft delete user by setting 'deleted' property to true
//         return document;
//       }),
//       switchMap((updatedDocument: any) => {
       
//         return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
//       }),
//       catchError(error => {
//         console.error('Error updating document:', error);
//         throw error;
//       })
//     );
//   }
  
  }