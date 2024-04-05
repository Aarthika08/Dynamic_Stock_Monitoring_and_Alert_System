import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutgoingStockService {
  private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d';

  constructor(private http: HttpClient) { }

  addOutgoingStock(userDetails: any): Observable<any> {
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
          if (stockArray[i].itemId === userDetails.itemId) {
            // Item found, update its details
            if (stockArray[i].quantity >= userDetails.quantity) {
              stockArray[i].quantity -= userDetails.quantity;
            } else {
              return throwError('Insufficient stock available for this item.');
            }
  
            // Update modified_date to the previous order_date
            stockArray[i].modified_date = stockArray[i].order_date;
            // Set order_date to the date provided by the user
            stockArray[i].order_date = userDetails.order_date;
  
            // Check if history array exists, if not create it
            if (!stockArray[i].outgoingHistory) {
              stockArray[i].outgoingHistory = [];
            }
  
            // Add the current order date and quantity to history
            stockArray[i].outgoingHistory.push({
              date: userDetails.order_date,
              quantity: userDetails.quantity // Subtracting quantity for outgoing stock
            });
  
            // Update status if quantity becomes zero
            if (stockArray[i].quantity === 0) {
              stockArray[i].status = 'Out of Stock';
            }
  
            itemFound = true;
            break;
          }
        }
  
        if (!itemFound) {
          return throwError('Item not found in the stock.');
        }
  
        document.stock = stockArray;
  
        // Update the document in the database
        return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
          catchError(error => {
            console.error('Error updating document:', error);
            return throwError('Error updating document');
          }),
          map(() => userDetails) // Return userDetails if successful
        );
  
      })
    );
  }
  
}
