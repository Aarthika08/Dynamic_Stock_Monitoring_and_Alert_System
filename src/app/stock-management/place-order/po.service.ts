// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap, map } from 'rxjs/operators';
// import { BehaviorSubject, interval } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class POService {
//   private refreshInterval = 5000; // 5 seconds

//   private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
//   private apiUrl='http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';
//   private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pending');
//   public status$: Observable<string> = this.statusSubject.asObservable();
//   constructor(private http: HttpClient) {
//   //   interval(5000).subscribe(() => {
//   //   const currentStatus = this.statusSubject.getValue();
//   //   this.statusSubject.next(this.getNextStatus(currentStatus));
//   // }); 

//   interval(this.refreshInterval).subscribe(() => {
//     const currentStatus = this.statusSubject.getValue();
//     const nextStatus = this.getNextStatus(currentStatus);
//     this.updateStatusInDatabase(nextStatus).subscribe(() => {
//       this.statusSubject.next(nextStatus);
//     });
//   });


// }

// private updateStatusInDatabase(newStatus: string): Observable<any> {
//     const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + btoa('admin:admin')
//     })
//   };
//   return this.http.get<any>(this.apiUrl,httpOptions).pipe(
//     switchMap((data) => {
//       const rev = data._rev;
//       return this.http.put<any>(this.apiUrl, { ...data, status: newStatus, _rev: rev },httpOptions);
//     })
//   );
// }


//   private getNextStatus(currentStatus: string): string {
//     switch (currentStatus) {
//       case 'Pending':
//         return 'Processing';
//       case 'Processing':
//         return 'packed';
//       case 'packed':
//         return 'Shipped';
//       case 'Shipped':
//         return 'Delivered';
//       case 'Delivered':
//         return 'Delivered'; // No further status, so remain as delivered
//       default:
//         return currentStatus;
//     }
//   } 

//     addOrder(newOrder: any): Observable<any> {
//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic ' + btoa('admin:admin')
//         })
//       };
//       return this.http.get<any>(this.baseUrl,httpOptions).pipe(
//         map((data: any) => {
//           if (data && data.orderslist) {
//             data.orderslist.push(newOrder);
//             return data;
//           } else {
//             // If the document doesn't have an orderslist yet, create one
//             return { orderslist: [newOrder] };
//           }
//         }),
//         switchMap((updatedData: any) => {
//           // Update the document in the database
//           return this.http.put<any>(this.baseUrl, updatedData,httpOptions);
//         })
//       );
//     }
// }



// import { Injectable } from '@angular/core';

//   import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//   import { Observable, throwError } from 'rxjs';
//   import { catchError, switchMap, map } from 'rxjs/operators';
//   import { BehaviorSubject, interval } from 'rxjs';
  
//   @Injectable({
//     providedIn: 'root'
//   })
//   export class POService {
//     private refreshInterval = 5000; // 5 seconds
  
//     // private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
//     private baseUrl='http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';
//     private apiUrl='http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';
//     private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pending');
//     public status$: Observable<string> = this.statusSubject.asObservable();
  
//     constructor(private http: HttpClient) {
//       interval(this.refreshInterval).subscribe(() => {
//         const currentStatus = this.statusSubject.getValue();
//         const nextStatus = this.getNextStatus(currentStatus);
//         this.updateStatusInDatabase(nextStatus).subscribe(() => {
//           this.statusSubject.next(nextStatus);
//           console.log('Status updated successfully:', nextStatus);
//         }, error => {
//           console.error('Error updating status:', error);
//         });
//       });
//     }
  
//     private updateStatusInDatabase(newStatus: string): Observable<any> {
//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic ' + btoa('admin:admin')
//         })
//       };
//       return this.http.get<any>(this.baseUrl, httpOptions).pipe(
//         switchMap((data) => {
//           const rev = data._rev;
//           return this.http.put<any>(this.baseUrl, { ...data, order_status: newStatus, _rev: rev }, httpOptions);
//         }),
//         catchError(this.handleError)
//       );
//     }
  
//     private handleError(error: HttpErrorResponse) {
//       if (error.error instanceof ErrorEvent) {
//         console.error('An error occurred:', error.error.message);
//       } else {
//         console.error(
//           `Backend returned code ${error.status}, ` +
//           `body was: ${error.error}`);
//       }
//       return throwError('Something bad happened; please try again later.');
//     }
  
//     private getNextStatus(currentStatus: string): string {
//       switch (currentStatus) {
//         case 'Pending':
//           return 'Processing';
//         case 'Processing':
//           return 'packed';
//         case 'packed':
//           return 'Shipped';
//         case 'Shipped':
//           return 'Delivered';
//         case 'Delivered':
//           return 'Delivered'; // No further status, so remain as delivered
//         default:
//           return currentStatus;
//       }
//     }

//   addOrder(newOrder: any): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:admin')
//       })
//     };

//     // Set the status to "Pending" before adding the order
//     newOrder.order_status = 'Pending';

//     return this.http.get<any>(this.baseUrl, httpOptions).pipe(
//       switchMap((data: any) => {
//         if (data && data.orderslist) {
//           data.orderslist.push(newOrder);
//           return this.http.put<any>(this.baseUrl, data, httpOptions);
//         } else {
//           return this.http.put<any>(this.baseUrl, { orderslist: [newOrder] }, httpOptions);
//         }
//       })
//     );
//   }

 
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, interval, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class POService {
  private refreshInterval = 5000; // 5 seconds
  private baseUrl = 'http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';
  private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pending');
  public status$: Observable<string> = this.statusSubject.asObservable();
  private intervalSubscription!: Subscription; // Variable to store the interval subscription

  constructor(private http: HttpClient) {
    // interval(this.refreshInterval).subscribe(() => {
    //   this.updateOrderStatuses();
    // });


   this.startInterval();
  }

  private startInterval() {
    this.intervalSubscription = interval(this.refreshInterval).subscribe(() => {
      this.updateOrderStatuses();
    });
  }

  private stopInterval() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe(); // Unsubscribe from the interval
    }
  }
  private updateOrderStatuses() {
    const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + btoa('admin:admin')
            })
          };
    this.http.get<any>(this.baseUrl,httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      if (data && data.order) {
        const updatedOrders = data.order.map((order: any) => {
          const currentStatus = order.order_status;
          const nextStatus = this.getNextStatus(currentStatus);
          if(currentStatus === 'Deliveredd')
          {    this.stopInterval();
          } 
          return { ...order, order_status: nextStatus };
        });
        this.updateOrdersInDatabase(updatedOrders);
      }
    }, error => {
      console.error('Error fetching orders:', error);
    });
  }

  private updateOrdersInDatabase(updatedOrders: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
  
    this.http.get<any>(this.baseUrl, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      if (data && data._rev) {
        const rev = data._rev;
        this.http.put<any>(this.baseUrl, { ...data, order: updatedOrders, _rev: rev }, httpOptions).subscribe(() => {
          console.log('Order statuses updated successfully');
        }, error => {
          console.error('Error updating order statuses:', error);
        });
      }
    }, error => {
      console.error('Error fetching current revision:', error);
    });
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private getNextStatus(currentStatus: string): string {
    switch (currentStatus) {
      case 'Pending':
        return 'Processing';
      case 'Processing':
        return 'packed';
      case 'packed':
        return 'Shipped';
      case 'Shipped':
        return 'Delivered';
      case 'Delivered':
        return 'Deliveredd'; // No further status, so remain as delivered
      default:
        return currentStatus;
    }
  }


  addOrder(newOrder: any): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:admin')
          })
        };
    
        // Set the status to "Pending" before adding the order
        newOrder.order_status = 'Pending';
    
        return this.http.get<any>(this.baseUrl, httpOptions).pipe(
          switchMap((data: any) => {
            if (data && data.orderslist) {
              data.orderslist.push(newOrder);
              return this.http.put<any>(this.baseUrl, data, httpOptions);
            } else {
              return this.http.put<any>(this.baseUrl, { orderslist: [newOrder] }, httpOptions);
            }
          })
        );
      }
    
}
