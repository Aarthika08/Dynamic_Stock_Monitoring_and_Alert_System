

//   private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d'; // Replace this with your actual API URL


   
// stock.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
    // private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d';
    private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; 

  constructor(private http: HttpClient) { }

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

  

