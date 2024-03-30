import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailHistoryService {
  private history: any[] = []; // Initialize email history
  private apiUrl = 'http://localhost:5984/stocks/e24e95c56bdb1bf50c3a1a1b31003134';

  constructor(private http: HttpClient) { }


  getEmailHistory(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin') 
      })
    };

    return this.http.get<any>(this.apiUrl, httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        throw error;
      }),
      map((document: any) => {
        return document.emailhist || []; 
      })
    );
  }




  addEmailToHistory(emailData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };    
      return this.http.get<any>(this.apiUrl, httpOptions).pipe(
        catchError(error => {
          console.error('Error fetching document:', error);
          return throwError('Error fetching document');
        }),
        switchMap((document: any) => {
          const usersArray: any[] = document.emailhist || [];
        
            usersArray.push(emailData);
    
            document.emailhist = usersArray;
    
            return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
              catchError(error => {
                console.error('Error updating document:', error);
                return throwError('Error updating document');
              }),
              map(() => emailData) // Return userDetails if successful
            );
          }
        )
      );
    }
  }  

