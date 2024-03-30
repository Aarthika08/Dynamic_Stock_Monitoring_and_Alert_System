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
