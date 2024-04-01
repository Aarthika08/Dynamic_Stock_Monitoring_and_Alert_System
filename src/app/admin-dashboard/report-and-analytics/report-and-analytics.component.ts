import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../dashboard/data.service';

import { ReportService } from '../report-and-analytics/report.service';
import Chart from 'chart.js/auto';
// import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-report-and-analytics',
  templateUrl: './report-and-analytics.component.html',
  styleUrls: ['./report-and-analytics.component.css']
})
export class ReportAndAnalyticsComponent implements OnInit  {
  stocksData!: any[];
  ordersData!: any[] ;
  orderList!: any[];
  stockList!: any[];

    @ViewChild('myChart') myChart!: ElementRef;
    @ViewChild('pieChart') pieChart!: ElementRef;

    constructor(private reportService: ReportService,private dataService: DataService) { }

ngOnInit(): void {


  // Fetch orders data
  this.reportService.getOrderReport().subscribe(
    (response: any) => {
      if (response && Array.isArray(response.orderslist)) {
        this.ordersData = response.orderslist;
        // console.log(this.ordersData);

        this.updateOrdersDonutChart();  
      } else {
        console.error('Invalid or empty orders data:', response);
      }
    },
    (error) => {
      console.error('Error loading orders data:', error);
    }
  );
  this.fetchData();
  this.fetchNewData();   

}

ngAfterViewInit(): void {
  if (this.stockList) {
    this.createChart();
    }
      if (this.stockList) {
  this.createPieChart();  }  

}
  updateOrdersDonutChart() {
  //   this.reportService.getOrderReport().subscribe(
  //     (data: any) => {
  //       if (data && data.orderslist) {
  //         const stockMap = new Map();
  //         data.orderslist.forEach((order: any) => {
  //           const stockName = order.product_name;
  //           const price = order.stock_quantity>5;
  //           if (stockMap.has(stockName)) {
  //             stockMap.set(stockName, stockMap.get(stockName) + price);
  //           } else {
  //             stockMap.set(stockName, price);
  //           }
  //         });
  
  //         const labels = Array.from(stockMap.keys());
  //         const dataValues = Array.from(stockMap.values());
          
  //         this.drawnewChart(labels, dataValues);
  //       } else {
  //         console.error('Invalid data format. Expected orderslist array.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error loading orders:', error);
  //     }
  //   );
  // }
  
  this.reportService.getOrderReport().subscribe(
    (data: any) => {
      if (data && data.orderslist) {
        const stockMap = new Map();
        data.orderslist.forEach((order: any) => {
          const stockName = order.product_name;
          const price = order.stock_quantity > 10 ? order.price : 0; // Use order price only if stock quantity > 5
          if (stockMap.has(stockName)) {
            stockMap.set(stockName, stockMap.get(stockName) + price);
          } else {
            stockMap.set(stockName, price);
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
    // const background = this.RandomColors({ labels.length });
    const background = this.RandomColors(labels.length);

  
    const ordersChart = new Chart('ordersDonutChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders',
          data: dataValues,
          backgroundColor: background,

          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },


      
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              filter: function(legendItem, chartData) {
                if (legendItem && legendItem.datasetIndex !== undefined && chartData && chartData.datasets) {
                  const dataset = chartData.datasets[legendItem.datasetIndex];
                  if (dataset && Array.isArray(dataset.data) && legendItem.index !== undefined) {
                    const dataValue = dataset.data[legendItem.index];
                    return typeof dataValue === 'number' && dataValue > 4;
                  }
                }
                return false;
              }
            }
          }         

        },
        scales: {
          x: {
            ticks: {
              color: 'black' // Change x-axis label text color here
            }
          },
          y: {
            ticks: {
              color: 'black' // Change y-axis label text color here
            }
          }
        }
      }
      

      
    });
  }

  

  RandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
      colors.push(color);
    }
    return colors;
  }

  fetchData(): void {
    this.dataService.getStockList().subscribe(data => {
      this.stockList = data.stocklist;
      this.createChart();
  
      console.log(this.stockList);
    },
    error => {
            console.error('Error fetching stocklist:', error);
          }
      
  );
  }
  
  
  createChart(): void {
    // Check if stocklist is populated
    if (this.stockList && this.stockList.length > 0) {
        const categoryCounts: { [category: string]: number } = {};

        this.stockList.forEach(item => {
            if (categoryCounts[item.itemCategory]) {
                categoryCounts[item.itemCategory]++;
            } else {
                categoryCounts[item.itemCategory] = 1;
            }
        });

        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);
        const backgroundColors = this.RandomColorsgenerator(labels.length);

        const ctx = this.myChart.nativeElement.getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Category Count',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: 'black', // Change data line color to black
                    borderWidth: 2,
                    pointBackgroundColor: 'black', // Change data point color to black
                    pointBorderColor: 'black', // Change data point border color to black
                    pointHoverBackgroundColor: 'black', // Change data point hover background color to black
                    pointHoverBorderColor: 'black',
                }, {
                    label: 'Count',
                    data: data,
                    type: 'line',
                    fill: false,
                    borderColor: 'black', // Change data line color to black
                    borderWidth: 2,
                    pointBackgroundColor: 'black', // Change data point color to black
                    pointBorderColor: 'black', // Change data point border color to black
                    pointHoverBackgroundColor: 'black', // Change data point hover background color to black
                    pointHoverBorderColor: 'black', // Change data point hover border color to black
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'Black' // Change text color here
                        }

                    },
                    tooltip: {
                        bodyColor: 'black' // Change tooltip text color here
                    }
                },
                scales: {
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        ticks: {
                            color: 'black' // Change y-axis label text color here
                        }
                    },
                    y2: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            color: 'black' // Change y-axis label text color here
                        }
                    },
                },

            }
        });
    }
}


  
    RandomColorsgenerator(count: number): string[] {
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
  
 
    fetchNewData(): void {
        this.dataService.getStockList().subscribe(
          (data: any) => {
            this.stockList = data.stocklist;
            this.createPieChart();
            console.log('Fetched stock list:', this.stockList);
          },
          (error) => {
            console.error('Error fetching stock list:', error);
          }
        );
      }
      
  
    createPieChart(): void {
      if (!this.pieChart || !this.pieChart.nativeElement || !this.stockList || this.stockList.length === 0) {
        return; // Exit if pieChart or stockList is not available
      }
      if (this.stockList && this.stockList.length > 0) {
        const categoryCounts: { [category: string]: number } = {};
    
        this.stockList.forEach(item => {
          if (categoryCounts[item.status]) {
            categoryCounts[item.status]++;
          } else {
            categoryCounts[item.status] = 1;
          }
        });
        const labell = Object.keys(categoryCounts);
        const datee = Object.values(categoryCounts);
       const backgroundCol = this.generatecolor(labell.length);
    
       
      const ctx = this.pieChart.nativeElement.getContext('2d');
  
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labell,
          datasets: [{
            label: 'Stock Status',
            data: datee,
            backgroundColor:backgroundCol,
            borderWidth: 1
          }]
        },
        options: {
          // Add options as needed
        }
      });
    }
  }
    generatecolor(count: number): string[] {
      const colors: string[] = [];
      for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
        colors.push(color);
      }
      return colors;
    }
  }