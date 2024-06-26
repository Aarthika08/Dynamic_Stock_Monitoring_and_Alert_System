import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:5984/user/bc6902f68695a9119c060aede00060ca';
  private couchDBUrl = 'http://localhost:5984/user/43407ead14cf09630aa0d936af00f847';

  private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL
  private apiUrl1 = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';

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
          if (response?.user && Array.isArray(response.user)) {

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
          if (response?.supplier && Array.isArray(response.supplier)) {
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
          if (response?.stock && Array.isArray(response.stock)) {
            return response.stock.length;
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

  getStockList(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    return this.http.get<any>(this.apiUrl,httpOptions)
    }

    getTotalorders(): Observable<number> {
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:admin')
          })
        };
      return this.http.get<any>(this.apiUrl1,httpOptions)
        .pipe(
          map(response => {
            if (response?.order && Array.isArray(response.order)) {
              return response.order.length;
            } else {
              throw new Error('Document or orderslist array not found.');
            }
          })
        );
    }
  
    
getAllOrders():  Observable<any> {
    
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };
      
  return this.http.get<any>(this.apiUrl,httpOptions);
    
}

getLast5Items(): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };
  return this.http.get<any[]>(`${this.apiUrl}?limit=5`,httpOptions);
}
}
