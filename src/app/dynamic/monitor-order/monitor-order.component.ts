

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-order',
  templateUrl: './monitor-order.component.html',
  styleUrls: ['./monitor-order.component.css']
})
export class OrderComponent implements OnInit {
  orderslist: any[] = [];
  chart: Chart | null = null;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataAndDrawGraphs();
  }

  fetchDataAndDrawGraphs() {
    const apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };

    this.http.get<any>(apiUrl, httpOptions).subscribe(data => {
      this.orderslist = data.order;
      this.drawGraphsForOrders();
    });
  }

  drawGraphsForOrders() {
    this.orderslist.forEach(order => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 49; // Adjust height for bullet graph
      const container = document.getElementById('graph-container');
      // const container = document.getElementById('graph-' + order.order_id) as HTMLCanvasElement;

      if (container) {
        container.appendChild(canvas);
      }

      const ctx = canvas.getContext('2d');
      if (ctx) {
       
        const labels = ['Price','Quantity'];
        const data =[order.price, order.stock_quantity]; 
       
          this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: '',
              data: data,
              backgroundColor: 'black',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              // borderRadius: 5 
            }]
          },
          options: {
            indexAxis: 'y', // Make the bars horizontal
            scales: {
              x: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      } else {
        console.error('Canvas context is null');
      }
    });
  }

  calculateOverallCostPrice(): number {
    let overallCostPrice = 0;
    for (let order of this.orderslist) {
      overallCostPrice += (order.single_quantity_price*order.stock_quantity);
    }
    return parseFloat(overallCostPrice.toFixed(2));
    }
  calculateOverallquantity(): number {
    let overallpo = 0;
    for (let order of this.orderslist) {
      overallpo += order.stock_quantity;
    }
    return overallpo;
  }
}