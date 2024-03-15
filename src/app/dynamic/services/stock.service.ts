// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, from, throwError } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// declare var ml5:any;
// @Injectable({
//   providedIn: 'root'
// })
// export class StockService {

//   private ml5Loaded: boolean = false;

//   constructor(private http: HttpClient) {}

//   private loadMl5(): Observable<void> {
//     return new Observable<void>((observer) => {
//       if (typeof ml5 === 'undefined') {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ml5/0.8.5/ml5.min.js';
//         script.onload = () => {
//           this.ml5Loaded = true;
//           observer.next();
//           observer.complete();
//         };
//         script.onerror = (error) => {
//           observer.error('Failed to load ml5.js');
//         };
//         document.body.appendChild(script);
//       } else {
//         this.ml5Loaded = true;
//         observer.next();
//         observer.complete();
//       }
//     });
//   }

//   private ensureMl5Loaded(): Observable<void> {
//     if (this.ml5Loaded) {
//       return from(Promise.resolve());
//     } else {
//       return this.loadMl5();
//     }
//   }

//   getStockData(symbol: string): Observable<any> {
//     const apiKey = 'P0MW9QC6NGV1IS3I'; // Replace with your Alpha Vantage API key
//     const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
//     return this.http.get(url);
//   }

  
            
    
//   analyzeStock(symbol: string): Observable<any> {
//     return this.ensureMl5Loaded().pipe(
//       switchMap(() => {
//         return new Observable((observer) => {
//           this.getStockData(symbol).subscribe((data: any) => {
//             // Extract relevant data for analysis
//             const price = parseFloat(data['Global Quote']['05. price']);
  
//             // Perform ml5.js analysis
//             const regression = ml5.linearRegression(); // Incorrect usage
//             const ml5Data = [
//               { x: 0, y: 1 },
//               { x: 1, y: 2 },
//               { x: 2, y: 3 },
//               // Add more data points based on your analysis requirement
//             ];
//             regression.input({
//               x: 'x'
//             });
//             regression.output({
//               y: 'y'
//             });
//             regression.addData(ml5Data);
//             regression.normalize();
//             regression.train({ epochs: 64 }, () => {
//               const result = regression.predict(price);
//               observer.next(result);
//               observer.complete();
//             });
//           }, error => {
//             observer.error(error);
//           });
//         });
//       }),
//       catchError(error => {
//         return throwError('Failed to load ml5.js');
//       })
//     );
//   }
  
// }
