import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js/auto';
import {OrderlistService} from '../order/orderlist.service';
import { tap } from 'rxjs/operators';

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
  rows: any[]; // Change 'any[]' to the type of your rows array
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

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

     this.fetchData();
     this.loadChartData();


    }
    ngAfterViewInit(): void {
      if (this.stocklist) {
        this.createChart();
      }
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
//chart 


// fetchData(): void {
//   this.dataService.getStockList().subscribe(data => {
//     this.stocklist = data.stocklist;
//     this.createChart();

//     console.log(this.stocklist);
//   },
//   error => {
//           console.error('Error fetching stocklist:', error);
//         }
    
// );
// }

fetchData(): void {
  this.dataService.getStockList().subscribe(data => {
    this.stocklist = data;
    this.createChart();

    console.log(this.stocklist);
  },
  error => {
          console.error('Error fetching stocklist:', error);
        }
    
);
}
createChart(): void {
  // Check if stocklist is populated
  if (this.stocklist && this.stocklist.length > 0) {
    const categoryCounts: { [category: string]: number } = {};

    this.stocklist.forEach(item => {
      if (categoryCounts[item.itemCategory]) {
        categoryCounts[item.itemCategory]++;
      } else {
        categoryCounts[item.itemCategory] = 1;
      }
    });

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);
    const backgroundColors = this.generateRandomColors(labels.length);

    const ctx = this.myChart.nativeElement.getContext('2d');


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Category Count',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: 'rgb(175, 172, 102)',
        borderWidth: 2
      }, {
        label: 'Count',
        // data: this.calculateAverage(data),
        data:data,
        type: 'line',
        fill: true,
        backgroundColor: backgroundColors,
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
      }]
    },
    options: {
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    }
  });
}
}

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
      colors.push(color);
    }
    return colors;
  }

  calculateAverage(data: number[]): number[] {
    const total = data.reduce((acc, val) => acc + val, 0);
    const average = total / data.length;
    return new Array(data.length).fill(average);
  }

//for order graph
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
      // labels:"stock",
      labels: labels,
      datasets: [{
        label:'stock',
        data: dataValues,
        backgroundColor: background,
        borderColor: 'rgb(0,0,0)',
        fill:true,
        borderWidth: 0.5,
        // hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      // plugins: {
        // legend: {
        //   position: 'right' 
        // } }
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
        // Sort the stocklist array by order_date in descending order
        data.stocklist.sort((a: any, b: any) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
        // Take the first 5 items from the sorted array
        this.items = data.stocklist.slice(0, 5);
      } else {
        console.error('Invalid data format received:', data);
        // Handle invalid data format as needed
      }
    },
    (err: any) => {
      console.error('An error occurred:', err);
      // Handle error as needed
    }
  );
}


}