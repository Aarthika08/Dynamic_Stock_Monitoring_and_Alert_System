import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js/auto';

// declare var Chart: any;
interface StockItem {
  id: number;
  itemName: string;
  itemDescription: string;
  itemCategory: string;
}
interface StockData {
  stocklist: StockItem[];
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
    // stocklist!: StockItem[];
    stocklist!: any[];
id!:string;

    @ViewChild('myChart') myChart!: ElementRef;

  
    constructor(private dataService: DataService) { }
  
    ngOnInit(): void {
      this.fetchTotalUsers();
      this. fetchTotalSupplier();
     this.fetchTotalItems();
     this.fetchData();

    }
    ngAfterViewInit(): void {
      if (this.stocklist) {
        this.createChart();
      }
    }

    //panel
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
//chart 

// fetchData(): void {
//   this.dataService.getStockList().subscribe(
//     data => {
//       // this.stocklist = data.stocklist;
//       this.stockList = data.stocklist;


//       console.log(this.stocklist); // Check if data is fetched correctly
//     },
//     error => {
//       console.error('Error fetching stocklist:', error);
//     }
//   );
// }

fetchData(): void {
  this.dataService.getStockList().subscribe(data => {
    this.stocklist = data.stocklist;
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

    // Create the chart
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Category Count',
  //         data: data,
  //         backgroundColor: backgroundColors,
  //         borderColor: 'rgb(75, 192, 192)',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }}

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
        fill: false,
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





}