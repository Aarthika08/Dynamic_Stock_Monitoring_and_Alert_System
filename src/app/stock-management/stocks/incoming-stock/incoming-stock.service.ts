

// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable, throwError } from 'rxjs';
// // import { catchError, switchMap, map } from 'rxjs/operators';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class IncomingStockService {

// //   apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL

// //   constructor(private http: HttpClient) { }

// //   addIncomingStock(userDetails: any): Observable<any> {
// //     const httpOptions = {
// //       headers: new HttpHeaders({
// //         'Content-Type': 'application/json',
// //         'Authorization': 'Basic ' + btoa('admin:admin')
// //       })
// //     };

// //     return this.http.get<any>(this.apiUrl, httpOptions).pipe(
// //       catchError(error => {
// //         console.error('Error fetching document:', error);
// //         return throwError('Error fetching document');
// //       }),
// //       switchMap((document: any) => {
// //         const stockArray: any[] = document.stock || [];
// //         let itemFound = false;

// //         for (let i = 0; i < stockArray.length; i++) {
// //           if (stockArray[i].itemId === userDetails.itemId) {
// //             // Item found, update its details
// //             stockArray[i].quantity += userDetails.quantity;
// //             stockArray[i].modified_date = stockArray[i].order_date; // Set modified_date to the previous order_date
// //             stockArray[i].order_date = userDetails.order_date; // Set order_date to the date provided by the user
// //             itemFound = true;
// //             break;
// //           }
// //         }

// //         if (!itemFound) {
// //           // Item not found, add it to the array
// //           userDetails.modified_date = userDetails.order_date; // Set modified_date to order_date
// //           stockArray.push(userDetails);
// //         }

// //         document.stock = stockArray;

// //         // Update the document in the database
// //         return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
// //           catchError(error => {
// //             console.error('Error updating document:', error);
// //             return throwError('Error updating document');
// //           }),
// //           map(() => userDetails) // Return userDetails if successful
// //         );

// //       })
// //     );
// //   }
// // }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class IncomingStockService {

//   apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL

//   constructor(private http: HttpClient) { }

//   addIncomingStock(userDetails: any): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };

//     return this.http.get<any>(this.apiUrl, httpOptions).pipe(
//       catchError(error => {
//         console.error('Error fetching document:', error);
//         return throwError('Error fetching document');
//       }),
//       switchMap((document: any) => {
//         const stockArray: any[] = document.stock || [];
//         let itemFound = false;

//         for (let i = 0; i < stockArray.length; i++) {
//           if (stockArray[i].itemId === userDetails.itemId) {
//             // Item found, update its details
//             stockArray[i].quantity += userDetails.quantity;
//             stockArray[i].modified_date = stockArray[i].order_date; // Set modified_date to the previous order_date
//             stockArray[i].order_date = userDetails.order_date; // Set order_date to the date provided by the user
            
//             // Check if history array exists, if not create it
//             if (!stockArray[i].history) {
//               stockArray[i].history = [];
//             }
            
//             // Add the current order date and quantity to history
//             stockArray[i].history.push({
//               date: userDetails.order_date,
//               quantity: userDetails.quantity
//             });
//             if (userDetails.quantity >= 1) {
//               stockArray[i].status = 'inStock';
//             }
//             itemFound = true;
//             break;
//           }
//         }

//         if (!itemFound) {
//           // Item not found, add it to the array
//           userDetails.modified_date = userDetails.order_date; // Set modified_date to order_date
//           stockArray.push(userDetails);
          
//           // Add history array for the new item
//           userDetails.history = [{
//             date: userDetails.order_date,
//             quantity: userDetails.quantity
//           }];
//         }

//         document.stock = stockArray;

//         // Update the document in the database
//         return this.http.put<any>(this.apiUrl, document, httpOptions).pipe(
//           catchError(error => {
//             console.error('Error updating document:', error);
//             return throwError('Error updating document');
//           }),
//           map(() => userDetails) // Return userDetails if successful
//         );

//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomingStockService {

  apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  addIncomingStock(userDetails: any): Observable<any> {
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
            stockArray[i].quantity += userDetails.quantity;
            stockArray[i].modified_date = stockArray[i].order_date; // Set modified_date to the previous order_date
            stockArray[i].order_date = userDetails.order_date; // Set order_date to the date provided by the user
            
            // Check if history array exists, if not create it
            if (!stockArray[i].history) {
              stockArray[i].history = [];
            }
            
            // Add the current order date and quantity to history
            stockArray[i].history.push({
              date: userDetails.order_date,
              quantity: userDetails.quantity
            });
            if (userDetails.quantity >= 1) {
              stockArray[i].status = 'inStock';
            }
            itemFound = true;
            break;
          }
        }

        if (!itemFound) {
          // Item not found, add it to the array
          userDetails.modified_date = userDetails.order_date; // Set modified_date to order_date
          stockArray.push(userDetails);
          
          // Add history array for the new item
          userDetails.history = [{
            date: userDetails.order_date,
            quantity: userDetails.quantity
          }];

          // Add status for the new item
          if (userDetails.quantity >= 1) {
            userDetails.status = 'inStock';
          }
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
