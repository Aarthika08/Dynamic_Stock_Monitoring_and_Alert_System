// // // login.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private couchDBUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca';
//   private headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic ' + btoa('admin:admin')
//   });

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string): Observable<boolean> {
//     return this.http.get<any>(this.couchDBUrl, { headers: this.headers }).pipe(
//       map((response: any) => {
//         console.log('Response retrieved:', response);
//         if (response && Array.isArray(response.user)) {
//           for (const userArray of response.user) {
//             for (const user of userArray) {
//               // if (user.email === email && user.password === password) {
                
//               //   return true;
//               // }
//               if (user.email === email) {
//                 // Decrypt the password and check if it matches the provided password
//                 const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);
//                 if (decryptedPassword === password) {
//                   return true;
//                 }
//               }
//             }
//           }
//         }
//         return false;
//       }),
//       catchError(error => {
//         console.error('Error fetching documents:', error);
//         return throwError('Error fetching documents');
//       })
//     );
//   }
  

//   }

// //2. login.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import * as CryptoJS from 'crypto-js';
// interface CouchDBDocument {
//   doc: any; // Define properties of the document if known
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private couchDBUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca';
//   private headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic ' + btoa('admin:admin')
//   });

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string): Observable<boolean> {
//     return this.http.get<any>(this.couchDBUrl, { headers: this.headers }).pipe(
//       map((response: any) => {
//         console.log('Response retrieved:', response);
//         if (response && response.rows.length > 0) {
//           // Explicitly specify the type of 'row' parameter
//           const users = response.rows.map((row: CouchDBDocument) => row.doc);
//           for (const user of users) {
//             if (user.email === email) {
//               // Decrypt the password and check if it matches the provided password
//               const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);
//               if (decryptedPassword === password) {
//                 return true;
//               }
//             }
//           }
//         }
//         return false;
//       }),
//       catchError(error => {
//         console.error('Error fetching documents:', error);
//         return throwError('Error fetching documents');
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
interface LoginResponse {
  success: boolean;
  user?: {
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private couchDBUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  });

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.get<any>(this.couchDBUrl, { headers: this.headers }).pipe(
      map((response: any) => {
        if (response && Array.isArray(response.user)) {
          for (const userArray of response.user) {
            for (const user of userArray) {
              if (user.email === email) {
                const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);
                if (decryptedPassword === password) {
                  return {
                    success: true,
                    user: {
                      email: user.email,
                      role: user.role
                    }
                  };
                }
              }
            }
          }
        }
        return { success: false };
      }),
      catchError(error => {
        console.error('Error fetching documents:', error);
        return throwError('Error fetching documents');
      })
    );
  }
}
