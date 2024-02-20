// report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
    private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d';
    private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf'; // Assuming your backend API endpoint

  constructor(private http: HttpClient) { }

  getStocksReport(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.apiUrl}`);
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
  
      return this.http.get<any>(this.apiUrl,httpOptions)
  }

  getOrderReport(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}`);

    
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
          
      return this.http.get<any>(this.baseUrl,httpOptions);
  }
}
