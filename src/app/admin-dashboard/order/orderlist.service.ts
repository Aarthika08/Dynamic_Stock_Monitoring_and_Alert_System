import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderlistService {
  private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf'; // Assuming your backend API endpoint
   private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';

  constructor(private http: HttpClient) { }

getAllOrders():  Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
        
    return this.http.get<any>(this.apiUrl,httpOptions);
        }
  
  getOrderById(orderId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin') 
        })
      };
    return this.http.get(`${this.baseUrl}/${orderId}`,httpOptions);
  }

  createOrder(orderData: any): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin') 
        })
      };
    return this.http.post(`${this.baseUrl}`, orderData,httpOptions);
  }

  updateOrder(orderId: string, orderData: any): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin') 
        })
      };
    return this.http.put(`${this.baseUrl}/${orderId}`, orderData,httpOptions);
  }

  deleteOrder(orderId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin') 
        })
      };
    return this.http.delete(`${this.baseUrl}/${orderId}`,httpOptions);
  }
}
