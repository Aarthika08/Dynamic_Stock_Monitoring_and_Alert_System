// stocks.service.ts
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
interface StockItem {
  itemId: number;
  itemName: string;
  itemDescription: string;
  // Add other properties as needed
}
@Injectable({
  providedIn: 'root'
})
export class StocksService {

  apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL
  username = 'admin';
  password = 'admin';
  couchDBUrl='http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d';

  
  constructor(private http: HttpClient) { }

  getStockList(): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) 
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
 

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
      tap((document: any) => {
        console.log('Fetched document:', document);
        if (!document.stock || userIndex >= document.stock.length) {
          throw new Error('User index out of range or document structure is incorrect');
        }
      }),
      map((document: any) => {
        // Assuming user details are stored as an array of objects
        document.stock[userIndex] = updatedUserData;
        return document;
      }),
      switchMap((updatedDocument: any) => {
        return this.http.put<any>(this.couchDBUrl, updatedDocument, httpOptions);
      }),
      catchError(error => {
        console.error('Error updating document:', error);
        return throwError(error);
      })
    );
  }
  
  
  }