import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private baseUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf'; // Assuming your backend API endpoint
   private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
 // private apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af02395d';

  constructor(private http: HttpClient) { }


getAllOrders():  Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
        
    return this.http.get<any>(this.apiUrl,httpOptions);
      
    // return this.http.get(this.apiUrl,httpOptions)
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
