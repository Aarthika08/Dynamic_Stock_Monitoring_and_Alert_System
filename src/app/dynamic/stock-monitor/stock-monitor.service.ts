import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define an interface for the stock item
interface StockItem {
  itemId: number;
  itemName: string;
  itemDescription: string;
  itemCategory: string;
  order_date: string;
  quantity: number;
  status: string;
  delete?: boolean;
  modified_date?: string;
  history?: { date: string; quantity: number }[];
  outgoingHistory?: { date: string; quantity: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class StockmonitorService {
  private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d';

 
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  fetchStockData(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
        
    return this.http.get<any[]>(this.apiUrl,httpOptions).pipe(
      catchError(error => {
        console.error('Error fetching stock data:', error);
        // Rethrow the error to propagate it to the caller
        throw error;
      })
    );
  }

  monitorStock(): void {
    this.fetchStockData().subscribe(
      (data) => {
        this.handleStockData(data);
      },
      (error) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }

  private handleStockData(stockData: any[]): void {
    // Check if the response data has the 'stock' property
    if (stockData && Array.isArray(stockData) && stockData.length > 0 && stockData[0].hasOwnProperty('stock')) {
      const stock = stockData[0].stock; // Access the 'stock' property
      // Process the stock data here and implement your monitoring logic

      // For example, you can check if any item is out of stock and display a notification
      const outOfStockItems = stock.filter((item: StockItem) => item.status === 'outofstock');
      if (outOfStockItems.length > 0) {
        this.showOutOfStockNotification(outOfStockItems);
      }
    } else {
      console.error('Invalid stock data format:', stockData);
    }
  }

  private showOutOfStockNotification(items: StockItem[]): void {
    const itemNames = items.map(item => item.itemName).join(', ');
    this.snackBar.open(`The following items are out of stock: ${itemNames}`, 'Close', {
      duration: 5000,
    });
  }
}
