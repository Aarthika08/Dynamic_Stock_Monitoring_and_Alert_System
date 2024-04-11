import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


interface Stock {
  itemName: string;
  stock: StockData[]; // Assuming StockData contains an array of StockItem
}
interface StockData {
  itemId: number;
  itemName: string;
  itemDescription: string;
  itemCategory: string;
  order_date: string;
  quantity: number;
  status: string;
  delete?: boolean;
  modified_date: string;
  history: { date: string; quantity: number }[];
  outgoingHistory: { date: string; quantity: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock!: Stock; // Store the fetched stock data

  constructor(private http: HttpClient) { }


  getStockData(): Observable<Stock> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:admin')
      })
    };
    return this.http.get<Stock>('http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d', httpOptions).pipe(
      map(data => {
        this.stock = data;
        return data;
      }),
      catchError(error => {
        console.error('Error fetching data from the API:', error);
        return throwError('Failed to fetch data from the API. Please try again later.');
      })
    );
  }



 

  // Support Vector Regression (SVR) algorithm implementation
  predictStockPricesSVR(X_train: number[], y_train: number[], X_test: number[]): number[] {
    // Calculate parameters for the linear regression line (slope and intercept)
    const { slope, intercept } = this.calculateLinearRegressionParams(X_train, y_train);
    // Use the linear regression line equation to predict the test data
    const predictions: number[] = [];
    for (let i = 0; i < X_test.length; i++) {
      const prediction = slope * X_test[i] + intercept;
      predictions.push(prediction);
    }
    return predictions;
  }

  // Helper function to calculate linear regression parameters (slope and intercept)
  private calculateLinearRegressionParams(X: number[], y: number[]): { slope: number, intercept: number } {
    if (X.length !== y.length || X.length === 0) {
      throw new Error('Invalid input data');
    }

    const n = X.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += X[i];
      sumY += y[i];
      sumXY += X[i] * y[i];
      sumX2 += X[i] ** 2;
    }

    const meanX = sumX / n;
    const meanY = sumY / n;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = meanY - slope * meanX;

    return { slope, intercept };
  }

  // Function to determine if the predicted sales are high (placeholder implementation)
  isHighSales(predictedSales: number[]): boolean {
    // Placeholder implementation, replace with your logic
    // For example, you can set a threshold for determining high sales
    const threshold = 10000;
    const totalSales = predictedSales.reduce((acc, curr) => acc + curr, 0);
    return totalSales > threshold;
  }

  
    
  predictSales(): Observable<{ itemName: string; history: any[]; outgoingHistory: any[] }> {
    return this.getStockData().pipe(
      map(stockData => {
        if (stockData && stockData.stock && stockData.stock.length > 0) {
          const firstItem = stockData.stock[0]; // Assuming we take the first item
          const itemName = firstItem.itemName;
          const history = firstItem.history;
          const outgoingHistory = firstItem.outgoingHistory;

          return { itemName, history, outgoingHistory };
        } else {
          throw new Error('No stock data available');
        }
      })
    );
  }
  predictAndCheckHighSales(): Observable<{ index: number; prediction: number; isHighSales: boolean }[]> {
    return this.predictSales().pipe(
      map(predictions => {
        const threshold = 50; // Define your threshold value here
  
        // Ensure that history and outgoingHistory are arrays
        if (!Array.isArray(predictions.history) || !Array.isArray(predictions.outgoingHistory)) {
          throw new Error('Invalid input data: history or outgoingHistory is not an array');
        }
  
        // Extract features and targets
        const { X_train, y_train, X_test } = this.extractFeaturesAndTargets(predictions.history, predictions.outgoingHistory);
  
        // Predict sales using your SVR model
        const predictedSales = this.predictStockPricesSVR(X_train, y_train, X_test);
  
        // Map predicted sales to include isHighSales property
        return predictedSales.map((prediction, index) => ({
          index: index,
          prediction,
          isHighSales: prediction > threshold
        }));
      })
    );
  }
  
 
  calculatePrediction(history: any[], outgoingHistory: any[]): number {
    // Perform calculation based on history or outgoingHistory or any other relevant data
    // For example, you can calculate prediction based on the sum of quantities in history or outgoingHistory
    let totalQuantity = 0;
    if (history) {
      totalQuantity += history.reduce((acc, item) => acc + item.quantity, 0);
    }
    if (outgoingHistory) {
      totalQuantity -= outgoingHistory.reduce((acc, item) => acc + item.quantity, 0);
    }
    return totalQuantity;
  }

  extractFeaturesAndTargets(history: any[], outgoingHistory: any[]): { X_train: number[], y_train: number[], X_test: number[] } {
    // Check if history and outgoingHistory arrays are provided
    if (!Array.isArray(history) || !Array.isArray(outgoingHistory)) {
      throw new Error('Invalid input data: History or outgoingHistory is not an array');
    }
  
    // Extract features and target values
    const X_train: number[] = [];
    const y_train: number[] = [];
    const X_test: number[] = [];
  
    // Implement your logic to extract features and targets here
    // For demonstration, we assume history and outgoingHistory contain valid data
    history.forEach(item => {
      if (item.date && item.quantity) {
        X_train.push(new Date(item.date).getTime());
        y_train.push(item.quantity);
      }
    });
  
    outgoingHistory.forEach(item => {
      if (item.date) {
        X_test.push(new Date(item.date).getTime());
      }
    });
  
    // Check if any of the arrays are empty after extraction
    if (X_train.length === 0 || y_train.length === 0 || X_test.length === 0) {
      throw new Error('Invalid input data: Empty feature or target arrays');
    }
  
    return { X_train, y_train, X_test };
  }

  getStockItemByIndex(index: number): Observable<StockData | undefined> {
    if (this.stock && this.stock.stock && index < this.stock.stock.length) {
      return of(this.stock.stock[index]);
    } else {
      return throwError('Item not found or index out of range');
    }
  }
}
