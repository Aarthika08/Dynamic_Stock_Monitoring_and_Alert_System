// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:5984/stocks/f085ee44a498071857873126cd0066b7';

  constructor(private http: HttpClient) { }

  fetchData() {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        })
      };
      return this.http.get<any>(this.apiUrl,httpOptions).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return throwError('Error fetching data. Please try again later.');
        })
      );
    }
    preprocessData(data: any) {
        if (!data || !data.order || !Array.isArray(data.order)) {
          console.error('Invalid data format:', data);
          return null; // Return null or handle this case according to your requirements
        }
    
        return data.order.map((order: any) => ({
          input: [
            order.stock_quantity,
            order.single_quantity_price
          ],
          output: [
            order.total_price
          ]
        }));
      }
    }