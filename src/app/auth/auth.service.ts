import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:5984/user'; // Replace with your CouchDB database URL

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Promise<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' +btoa('admin:admin')     })};

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/${username}`, httpOptions).pipe(
        map(user => {
          if (user && user.password === password) {
            return true; // Authentication successful
          } else {
            return false; // Authentication failed
          }
        }),
        catchError((error: any): Observable<boolean> => {
          if (error.status === 404) {
            return of(false); // User not found, authentication failed
          } else {
            reject(error); // Other errors
            return of(false);
          }
        })
      ).subscribe((result: boolean) => resolve(result)); // Resolve the promise with the result
    });
  }
}
