import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca';
  private couchDBUrl = 'http://localhost:5984/user/43407ead14cf09630aa0d936af00f847'; // Update with your document ID
  private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d';

  constructor(private http: HttpClient) { }

  getTotalUsers(): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    return this.http.get<any>(this.baseUrl, httpOptions)
      .pipe(
        map(response => {
          if (response && response.user && Array.isArray(response.user)) {
            return response.user.length;
          } else {
            throw new Error('Document or user array not found.');
          }
        })
      );
  }

  
  getTotalsupplier(): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    return this.http.get<any>(this.couchDBUrl, httpOptions).pipe(
        map(response => {
          if (response && response.supplier && Array.isArray(response.supplier)) {
            return response.supplier.length;
          } else {
            throw new Error('Document or user array not found.');
          }
        })
      );
  }

  getTotalItems(): Observable<number> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
    return this.http.get<any>(this.apiUrl,httpOptions)
      .pipe(
        map(response => {
          if (response && response.stocklist && Array.isArray(response.stocklist)) {
            return response.stocklist.length;
          } else {
            throw new Error('Document or stocklist array not found.');
          }
        })
      );
  }


  getTotalUsers1(): Observable<number> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
    return this.http.get<number>(`${this.baseUrl}/totalUsers`,httpOptions);
  }

//   getStockList(): Observable<any[]> {
//     const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic ' + btoa('admin:admin')
//         })
//       };
//     return this.http.get<any[]>(`${this.couchDBUrl}`,httpOptions);
//   }
  getStockList(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    return this.http.get<any>(this.apiUrl,httpOptions)
  // stock.service.ts
    // return this.http.get<any>('URL_TO_YOUR_JSON_FILE');
  }
}
