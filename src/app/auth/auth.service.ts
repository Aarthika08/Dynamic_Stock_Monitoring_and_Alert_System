

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic ' +btoa('admin:admin')     })};

    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { catchError, map } from 'rxjs/operators';
    import { of, Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AdminAuthService {
      private apiUrl = 'http://admin:admin@localhost:5984/user'; // Replace with your CouchDB database URL, username, and password
    
      constructor(private http: HttpClient) {}
    
      authenticate(username: string, password: string): Promise<boolean> {
         const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' +btoa('admin:admin')     })};
      
        return new Promise<boolean>((resolve, reject) => {
          this.http.get<any>(`${this.apiUrl}`, httpOptions).pipe(
            map(user => {
              if (user && user.password === password) {
                return true; // Authentication successful
                if((username == user.username)&&(password === user.password)){
                  console.log("successfule ")
                }
              } else {
                console.log(username,password);
                console.log(user.username,user.password);

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
    