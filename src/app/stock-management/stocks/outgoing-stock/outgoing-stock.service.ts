

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class OutgoingStockService {
//   private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d';

//   constructor(private http: HttpClient) { }

//   addOutgoingStock(userDetails: any): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };
  
//     return this.http.get<any>(this.apiUrl, httpOptions).pipe(
//       catchError(error => {
//         console.error('Error fetching document:', error);
//         return throwError(() => new Error('Error fetching document'));
   
        
//       }),
//       switchMap((document: any) => {
//         const stockArray: any[] = document.stock || [];
//         let itemFound = false;
  
        
  
//         for (const stockItem of stockArray) {
//           if (stockItem.itemId === userDetails.itemId) {
//             if (stockItem.quantity >= userDetails.quantity) {
//               stockItem.quantity -= userDetails.quantity;
//             } else {
//               return throwError(() => new Error('Insufficient stock available for this item.'));

//             }
  
//             stockItem.modified_date = stockItem.order_date;
//             stockItem.order_date = userDetails.order_date;
  
//             if (!stockItem.outgoingHistory) {
//               stockItem.outgoingHistory = [];
//             }
  
//             stockItem.outgoingHistory.push({
//               date: userDetails.order_date,
//               quantity: userDetails.quantity
//             });
  
//             if (stockItem.quantity === 0) {
//               stockItem.status = 'Out of Stock';
//             }
  
//             itemFound = true;
//             break;
//           }
//         }
//         if (!itemFound) {
//           return throwError(() => new Error('Item not found in the stock.'));

//         }
  
//         document.stock = stockArray;
  
//         // Update the document in the database
//         return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
//           catchError(error => {
//             return throwError(() => new Error('Error updating document'));

//           }),
//           map(() => userDetails) // Return userDetails if successful
//         );
  
//       })
//     );
//   }
 
  


//   getStockDetails(itemId: number): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };
  
//     return this.http.get<any>(this.apiUrl, httpOptions)
//   }
// }






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
        return throwError(() => new Error('Error fetching document'));
   
        
      }),
      switchMap((document: any) => {
        const stockArray: any[] = document.stock || [];
        let itemFound = false;
  
        
  
        for (const stockItem of stockArray) {
          if (stockItem.itemId === userDetails.itemId) {
            if (stockItem.quantity >= userDetails.quantity) {
              stockItem.quantity -= userDetails.quantity;
            } else {
              return throwError(() => new Error('Insufficient stock available for this item.'));

            }
  
            stockItem.modified_date = stockItem.order_date;
            stockItem.order_date = userDetails.order_date;
  
            if (!stockItem.outgoingHistory) {
              stockItem.outgoingHistory = [];
            }
  
            stockItem.outgoingHistory.push({
              date: userDetails.order_date,
              quantity: userDetails.quantity
            });
  
            if (stockItem.quantity === 0) {
              stockItem.status = 'Out of Stock';
            }
  
            itemFound = true;
            break;
          }
        }
        if (!itemFound) {
          return throwError(() => new Error('Item not found in the stock.'));

        }
  
        document.stock = stockArray;
  
        // Update the document in the database
        return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
          catchError(error => {
            return throwError(() => new Error('Error updating document'));

          }),
          map(() => userDetails) // Return userDetails if successful
        );
  
      })
    );
  }
 
  


  getStockDetails(itemId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
  
    return this.http.get<any>(this.apiUrl, httpOptions)
  }
}





