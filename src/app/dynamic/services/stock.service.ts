import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  history: { date: string, quantity: number }[];
  outgoingHistory: { date: string, quantity: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  // Function to retrieve data from the API endpoint


  getStockData(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
    return this.http.get<any>('http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d',httpOptions)
      .pipe(
        tap(data => console.log('Response from API:', data))
      );
  }
  // Function to preprocess data, train SVR model, and predict sales

  // predictSales(): Observable<{ predictedSales: number[], isHighSales: boolean }> {
  //   return new Observable(observer => {
  //     this.getStockData().subscribe(data => {
  //       if (!data || !Array.isArray(data.stock)) {
  //         const errorMessage = 'Invalid data format. API response does not contain the expected structure.';
  //         console.error(errorMessage, data);
  //         observer.error(errorMessage);
  //         return;
  //       }
  
  //       // Extract relevant data from the response
  //       const stockData = data.stock;
  
  //       // Preprocess data, extract features and target values, train SVR model, and predict sales
  //       const { X_train, y_train, X_test } = this.extractFeaturesAndTargets(stockData);
  //       const predictedSales = this.predictStockPricesSVR(X_train, y_train, X_test);
  
  //       // Determine if the predicted sales are high
  //       const isHighSales = this.isHighSales(predictedSales);
  
  //       // Emit the result
  //       observer.next({ predictedSales, isHighSales });
  //       observer.complete();
  //     }, error => {
  //       console.error('Error fetching data from the API:', error);
  //       observer.error('Failed to fetch data from the API. Please try again later.');
  //     });
  //   });
  // }
  
  // Function to extract features and target values
  // extractFeaturesAndTargets(stockData: any[]): { X_train: number[], y_train: number[], X_test: number[] } {
  //   // Extract features and target values
  //   const history = [];
  //   const outgoingHistory = [];
  //   for (const item of stockData) {
  //     if (item.history && item.history.length > 0) {
  //       history.push(...item.history);
  //     }
  //     if (item.outgoingHistory && item.outgoingHistory.length > 0) {
  //       outgoingHistory.push(...item.outgoingHistory);
  //     }
  //   }
  
  //   const X_train = history.map(item => new Date(item.date).getTime());
  //   const y_train = history.map(item => item.quantity);
  //   const X_test = outgoingHistory.map(item => new Date(item.date).getTime());
  //   return { X_train, y_train, X_test };
  // }
  
  


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

  // Function to predict sales and determine if they are high for each prediction
// predictAndCheckHighSales(): void {
//     this.predictSales().subscribe(result => {
//       const predictedSales = result.predictedSales;
//       const threshold = 50; // Define your threshold value here
  
//       // Iterate over each predicted sales value
//       for (let i = 0; i < predictedSales.length; i++) {
//         const prediction = predictedSales[i];
  
//         // Determine if the prediction exceeds the threshold
//         const isHighSales = prediction > threshold;
  
//         // Output the prediction and whether it's considered high sales
//         console.log(`Prediction ${i + 1}: ${prediction}`);
//         console.log(`High Sales: ${isHighSales}`);
//       }
//     });
//   }
  // 2
  // predictAndCheckHighSales(): Observable<{ prediction: number, isHighSales: boolean }[]> {
  //   return new Observable(observer => {
  //     this.predictSales().subscribe(result => {
  //       const predictedSales = result.predictedSales;
  //       const threshold = 50; // Define your threshold value here
  //       const predictionsWithHighSales: { prediction: number, isHighSales: boolean }[] = [];
  
  //       // Iterate over each predicted sales value
  //       for (let i = 0; i < predictedSales.length; i++) {
  //         const prediction = predictedSales[i];
  
  //         // Determine if the prediction exceeds the threshold
  //         const isHighSales = prediction > threshold;
  
  //         // Store the prediction and its high sales status in the array
  //         predictionsWithHighSales.push({ prediction, isHighSales });
  //       }
  
  //       // Emit the array containing predictions and their high sales status
  //       observer.next(predictionsWithHighSales);
  //       observer.complete();
  //     }, error => {
  //       observer.error(error);
  //     });
  //   });
  // }
    
  
  predictSales(): Observable<{ stockName: string, history: any[], outgoingHistory: any[] }> {
    return new Observable(observer => {
      this.getStockData().subscribe(data => {
        const stockName = data.stockName; // Assuming stockName is available in the response
        const stock = data.stock;
  
        // Check if stock is an array and contains the necessary data
        if (!Array.isArray(stock) || stock.length === 0 || !stock[0].history || !stock[0].outgoingHistory) {
          observer.error('Invalid input data: Unable to extract history or outgoingHistory from stock');
          return;
        }
  
        // Extract history and outgoingHistory from the first item in the stock array
        const history = stock[0].history;
        const outgoingHistory = stock[0].outgoingHistory;
  
        // Emit the extracted data
        observer.next({ stockName, history, outgoingHistory });
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
  


  //2
 
  predictAndCheckHighSales(): Observable<{ stockName: string, prediction: number, isHighSales: boolean }[]> {
    return new Observable(observer => {
      this.predictSales().subscribe((predictions: { stockName: string, history: any[], outgoingHistory: any[] }) => {
        const threshold = 50; // Define your threshold value here
  
        // Ensure that history and outgoingHistory are arrays
        if (!Array.isArray(predictions.history) || !Array.isArray(predictions.outgoingHistory)) {
          observer.error('Invalid input data: history or outgoingHistory is not an array');
          return;
        }
  
        // Extract features and targets
        const { X_train, y_train, X_test } = this.extractFeaturesAndTargets(predictions.history, predictions.outgoingHistory);
  
        // Predict sales using your SVR model
        const predictedSales = this.predictStockPricesSVR(X_train, y_train, X_test);
  
        // Map predicted sales to include isHighSales property
        const predictionsWithHighSales = predictedSales.map(prediction => {
          // Determine if the prediction exceeds the threshold
          const isHighSales = prediction > threshold;
  
          // Return the prediction object with the high sales status
          return {
            stockName: predictions.stockName,
            prediction: prediction,
            isHighSales: isHighSales
          };
        });
  
        // Emit the array containing predictions with high sales status
        observer.next(predictionsWithHighSales);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
  
  
  
  // Function to calculate prediction based on relevant data
  calculatePrediction(prediction: { stockName: string, history: any[], outgoingHistory: any[] }): number {
    // Perform calculation based on history or outgoingHistory or any other relevant data
    // For example, you can calculate prediction based on the sum of quantities in history or outgoingHistory
    let totalQuantity = 0;
    if (prediction.history) {
      totalQuantity += prediction.history.reduce((acc, item) => acc + item.quantity, 0);
    }
    if (prediction.outgoingHistory) {
      totalQuantity -= prediction.outgoingHistory.reduce((acc, item) => acc + item.quantity, 0);
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
  

}