import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAvailabilityService {
  apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your API base URL
  username = 'admin';
  password = 'admin';

  constructor(private http: HttpClient) { }

  getStockAvailability(): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) 
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
