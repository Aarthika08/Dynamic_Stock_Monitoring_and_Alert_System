import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js/auto';
import {OrderlistService} from '../order/orderlist.service';

interface StockItem {
  id: number;
  itemName: string;
  itemDescription: string;
  itemCategory: string;
}
interface StockData {
  stocklist: StockItem[];
}
interface DataResponse {
  rows: any[]; 
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
  export class DashboardComponent implements OnInit {

    totalUsers!: number;
    totalsupplier!: number;
    totalItems!:number;
    totalorders!:number;
    // stocklist!: StockItem[];
    stocklist!: any[];
    orderlist!:any[];
id!:string;
categories: string[] = [];
  counts: number[] = [];
  backgroundColors: string[] = [];
  items: any[]=[];
p1='';
p2='';

    @ViewChild('myChart') myChart!: ElementRef;

    @ViewChild('newChart') newChart!: ElementRef;
    chart: any;
  
    constructor(private dataService: DataService,private orderService: OrderlistService) { }
  
    ngOnInit(): void {
      this.fetchLast5Items();
      this.fetchTotalUsers();
      this. fetchTotalSupplier();
     this.fetchTotalItems();
     this.fetchTotalorders();

     this.loadChartData();


    }
   
    fetchTotalUsers(): void {
      this.dataService.getTotalUsers().subscribe(
        count => {
          this.totalUsers = count;
        },
        error => {
          console.error('Error fetching total users:', error);
          this.totalUsers = -1; // Set a default value or handle error in your UI
        }
      );
    }

    fetchTotalSupplier(): void {
      this.dataService.getTotalsupplier().subscribe(
        count => {
          this.totalsupplier = count;
        },
        error => {
          console.error('Error fetching total users:', error);
          this.totalsupplier = -1; // Set a default value or handle error in your UI
        }
      );
    }

     fetchTotalItems(): void {
    this.dataService.getTotalItems().subscribe(
      count => {
        this.totalItems = count;
      },
      error => {
        console.error('Error fetching total items:', error);
        this.totalItems = -1; // Set a default value or handle error in your UI
      }
    );
  }
  fetchTotalorders(): void {
    this.dataService.getTotalorders().subscribe(
      count => {
        this.totalorders = count;
      },
      error => {
        console.error('Error fetching total items:', error);
        this.totalorders = -1; // Set a default value or handle error in your UI
      }
    );
  }



loadChartData(): void {
  this.orderService.getAllOrders().subscribe(
    (data: any) => {
      if (data && data.orderslist) {
        const stockMap = new Map();
        data.orderslist.forEach((order: any) => {
          const stockName = order.stock_name;
          const quantity = order.stock_quantity;
          if (stockMap.has(stockName)) {
            stockMap.set(stockName, stockMap.get(stockName) + quantity);
          } else {
            stockMap.set(stockName, quantity);
          }
        });

        const labels = Array.from(stockMap.keys());
        const dataValues = Array.from(stockMap.values());

        this.drawnewChart(labels, dataValues);
      } else {
        console.error('Invalid data format. Expected orderslist array.');
      }
    },
    (error) => {
      console.error('Error loading orders:', error);
    }
  );
}


drawnewChart(labels: string[], dataValues: number[]): void {
  const background = this.RandomColors({ count: labels.length });

  this.chart = new Chart(this.newChart.nativeElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label:'stock',
        data: dataValues,
        backgroundColor: background,
        borderColor: 'rgb(0,0,0)',
        fill:true,
        borderWidth: 0.5
      }]
    },
    options: {
      responsive: true,
    
        plugins: {
          legend: {
            labels: {
              color: 'Black' 
            }
            
          },
          tooltip: {
            bodyColor: 'white' 
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'black' 
            }
          },
          y: {
            ticks: {
              color: 'black' 
            }
          }
        }
    }
  });
}
RandomColors({ count }: { count: number; }): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
    colors.push(color);
  }
  return colors;
}

fetchLast5Items(): void {
  this.dataService.getLast5Items().subscribe(
    (data: any) => {
      if (data && data.stocklist) {
        data.stocklist.sort((a: any, b: any) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
        this.items = data.stocklist.slice(0, 5);
      } else {
        console.error('Invalid data format received:', data);
      }
    },
    (err: any) => {
      console.error('An error occurred:', err);
    }
  );
}


}