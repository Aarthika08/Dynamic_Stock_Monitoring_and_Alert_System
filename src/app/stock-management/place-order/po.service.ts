import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, interval, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class POService {
  private refreshInterval = 5000; // 5 seconds
  // private baseUrl = 'http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';
  private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';

  
  private statusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pending');
  public status$: Observable<string> = this.statusSubject.asObservable();
  private intervalSubscription!: Subscription; // Variable to store the interval subscription

  constructor(private http: HttpClient) {
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

    this.http.get<any>(this.baseUrl, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      if (data?.order) {
        const updatedOrders = data.order.map((order: any) => {
          const currentStatus = order.order_status;
          const nextStatus = this.getNextStatus(currentStatus);
          return { ...order, order_status: nextStatus };
        });
        this.updateOrdersInDatabase(updatedOrders, data._rev);
      }
    });
  }

  private updateOrdersInDatabase(updatedOrders: any[], currentRev: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
  
    this.http.get<any>(this.baseUrl, httpOptions).subscribe({ next:(data) => {
      const latestRev = data._rev;
      // Ensure we're using the latest revision before updating
      if (latestRev === currentRev) {
        this.http.put<any>(this.baseUrl, { order: updatedOrders, _rev: currentRev }, httpOptions).subscribe(() => {
          console.log('Order statuses updated successfully');
        }, error => {
          console.error('Error updating order statuses:', error);
        });
      } else {
        console.error('Conflict detected: The document has been updated since retrieval. Please fetch the latest version and try again.');
      }
    },error: error => {
      console.error('Error fetching latest revision:', error);
  }});
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching orders:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }

  private getNextStatus(currentStatus: string): string {
    switch (currentStatus) {
      case 'Pending':
        return 'Processing';
      case 'Processing':
        return 'Packed';
      case 'Packed':
        return 'Shipped';
      case 'Shipped':
        return 'Delivered';
      case 'Delivered':
        return 'Delivered'; // No further status, so remain as delivered
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
    newOrder.total_price = newOrder.single_quantity_price * newOrder.stock_quantity; // Calculate total price

    return this.http.get<any>(this.baseUrl, httpOptions).pipe(
      switchMap((data: any) => {
        if (data?.order) {
          data.order.push(newOrder);
          return this.http.put<any>(this.baseUrl, data, httpOptions);
        } else {
          return this.http.put<any>(this.baseUrl, { order: [newOrder] }, httpOptions);
        }
      })
    );
  }

}



