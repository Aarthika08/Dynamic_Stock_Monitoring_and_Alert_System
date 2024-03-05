import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class POService {
  private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
  
  constructor(private http: HttpClient) { }

  

  // addOrder(orderData: any): Observable<any> {
   

    addOrder(newOrder: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
      return this.http.get<any>(this.baseUrl,httpOptions).pipe(
        map((data: any) => {
          if (data && data.orderslist) {
            data.orderslist.push(newOrder);
            return data;
          } else {
            // If the document doesn't have an orderslist yet, create one
            return { orderslist: [newOrder] };
          }
        }),
        switchMap((updatedData: any) => {
          // Update the document in the database
          return this.http.put<any>(this.baseUrl, updatedData,httpOptions);
        })
      );
    }

    updateOrderStatus(orderData: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}`, orderData);
    }
}
