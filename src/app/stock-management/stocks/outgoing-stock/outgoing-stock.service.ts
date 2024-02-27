

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutgoingStockService {

  apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  removeOutgoingStock(item: any): Observable<any> {
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
        const stockArray: any[] = document.stock || [];
        let itemFound = false;

        for (let i = 0; i < stockArray.length; i++) {
          if (stockArray[i].itemId === item.itemId) {
            // Item found, update its details
            const newQuantity = stockArray[i].quantity - item.quantity;
            if (newQuantity < 0) {
              alert(`The quantity of ${item.name} is greater than the available amount in the warehouse.`);
              return throwError('Not enough stock available.');
            }

            stockArray[i].quantity = newQuantity;
            stockArray[i].modified_date = new Date().toISOString(); // Update modified_date to current date
            stockArray[i].outgoingHistory = stockArray[i].outgoingHistory || [];
            stockArray[i].outgoingHistory.push({ date: new Date().toISOString(), quantity: item.quantity });
            
            // Update the status if quantity is 0 or 1
            if (newQuantity <= 1) {
              stockArray[i].status = 'Out of Stock';
            }

            itemFound = true;
            break;
          }
        }

        if (!itemFound) {
          // Item not found, throw an error or handle it as needed
          return throwError('Item not found');
        }

        document.stock = stockArray;

        // Update the document in the database
        return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
          catchError(error => {
            console.error('Error updating document:', error);
            return throwError('Error updating document');
          }),
          map(() => item) // Return item if successful
        );

      })
    );
  }
}
