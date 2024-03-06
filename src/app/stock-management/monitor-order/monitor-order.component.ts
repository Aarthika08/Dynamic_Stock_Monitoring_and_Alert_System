// // include bullergraph to the table in angular project


// import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
// import { MonitorService } from './monitororder.service';
// import Chart, { ChartItem } from 'chart.js/auto';
// import { HttpClient,HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-monitor-order',
//   templateUrl: './monitor-order.component.html',
//   styleUrls: ['./monitor-order.component.css']
// })
// // export class MonitorOrderComponent implements AfterViewInit {
//   export class MonitorOrderComponent  {

//   orders: any[] = [];
//   // orderslist: Order[] = []; // Assuming orderslist is of type Order[]
//   orderslist: any[] = []; // Assuming orderslist is an array of orders

//   // @ViewChildren('lineChart') lineCharts!: QueryList<ElementRef>;
//   // @ViewChildren('bulletGraph') bulletGraphs: QueryList<ElementRef>;

//   constructor(private orderService: MonitorService,private http: HttpClient) { }

  
//   ngOnInit(): void {
//     // this.fetchDataAndDisplayGraph();
//     this.fetchDataAndDrawGraphs();

//   }



    
//   // loadOrders(): void {
//   //   const headers = new HttpHeaders({
//   //     'Content-Type': 'application/json',
//   //     'Authorization': 'Basic ' + btoa('admin:admin')
//   //   });
  
//   //   this.http.get<any>('http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf', { headers }).subscribe(
     
//   //     (data: any) => {
//   //       if (data && data.orderslist) {
//   //         this.orders = data.orderslist;
//   //         // this.fetchDataAndDisplayGraph();
//   //         this. displaySampleGraph() ;
//   //       } else {
//   //         console.error('Invalid data format. Expected orderslist array.');
//   //       }
//   //     },
//   //     (error) => {
//   //       console.error('Error loading orders:', error);
//   //     }
//   //   );
//   // }

// //   fetchDataAndDrawGraph() {
// //     const apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
// //     const httpOptions = {
// //       headers: new HttpHeaders({
// //         'Content-Type': 'application/json',
// //         'Authorization': 'Basic ' + btoa('admin:admin')
// //       })
// //     };

// //     this.http.get<any>(apiUrl, httpOptions).subscribe(data => {
// //       this.orderslist = data.orderslist;

// //       // Extract quantity data for the graph
// //       const labels = this.orderslist.map(order => order.order_date);
// //       const quantities = this.orderslist.map(order => order.stock_quantity);

// //       // Draw the graph
// //       this.drawGraph(labels, quantities);
// //     });
// //   }

// //   drawGraph(labels: string[], quantities: number[]) {
// //     const canvas = document.getElementById('quantity-chart') as HTMLCanvasElement;
// //     if (!canvas) {
// //       console.error('Canvas element not found.');
// //       return;
// //     }

// //     const ctx = canvas.getContext('2d');
// //     if (!ctx) {
// //       console.error('Canvas context is null.');
// //       return;
// //     }

// //     new Chart(ctx, {
// //       type: 'line',
// //       data: {
// //         labels: labels,
// //         datasets: [{
// //           label: 'Stock Quantity',
// //           data: quantities,
// //           borderColor: 'rgb(75, 192, 192)',
// //           tension: 0.1
// //         }]
// //       }
// //     });
// //   }
// // }

// fetchDataAndDrawGraphs() {
//   const apiUrl = 'http://localhost:5984/stocks/43407ead14cf09630aa0d936af030ddf';
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + btoa('admin:admin')
//     })
//   };

//   this.http.get<any>(apiUrl, httpOptions).subscribe(data => {
//     this.orderslist = data.orderslist;
//     this.drawGraphsForOrders();
//   });
// }

// // drawGraphsForOrders() {
// //   this.orderslist.forEach(order => {
// //     const canvas = document.createElement('canvas');
// //     canvas.width = 400;
// //     canvas.height = 400;
// //     canvas.id = `graph-${order.order_id}`;
// //     // document.getElementById('graph-container').appendChild(canvas);
// //     const container = document.getElementById('graph-container');
// //     if (container) {
// //       container.appendChild(canvas);
// //     } else {
// //       console.error('Graph container element not found.');
// //       return; // Abort if the container element is not found
// //     }
// //     const labels = ['Price', 'Quantity']; // Labels for price and quantity
// //     const data = [order.price, order.stock_quantity]; // Data for price and quantity

// //     new Chart(canvas, {
// //       type: 'horizontalBullet',
// //       data: {
// //         labels: labels,
// //         datasets: [{
// //           label: 'Price vs Quantity',
// //           data: data,
// //           backgroundColor: [
// //             'rgba(255, 99, 132, 0.2)', // Red color for price
// //             'rgba(54, 162, 235, 0.2)', // Blue color for quantity
// //           ],
// //           borderColor: [
// //             'rgba(255, 99, 132, 1)', // Red border color for price
// //             'rgba(54, 162, 235, 1)', // Blue border color for quantity
// //           ],
// //           borderWidth: 1
// //         }]
// //       },
// //       options: {
// //         scales: {
// //           y: {
// //             beginAtZero: true
// //           }
// //         }
// //       }
// //     });
// //   });
// // }}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-monitor-order',
  templateUrl: './monitor-order.component.html',
  styleUrls: ['./monitor-order.component.css']
})
export class MonitorOrderComponent implements OnInit {
  orderslist: any[] = [];

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
      this.orderslist = data.orderslist;
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
        // const labels = ['Price', 'Quantity']; // Labels for price and quantity
        // const data = [order.price, order.stock_quantity]; // Data for price and quantity
        const labels = ['Price','Quantity'];
        const data =[order.price, order.stock_quantity]; 
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: '',
              data: data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              borderRadius: 5 
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
}