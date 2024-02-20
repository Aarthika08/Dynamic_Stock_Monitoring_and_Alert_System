import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-and-analytics/report.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report-and-analytics',
  templateUrl: './report-and-analytics.component.html',
  styleUrls: ['./report-and-analytics.component.css']
})
export class ReportAndAnalyticsComponent implements OnInit {
  stocksData!: any[];
  ordersData!: any[] ;
  orderList!: any[];
  stockList!: any[];

 
  // constructor(private reportService: ReportService) { }

  // ngOnInit(): void {
    // Fetch stocks data
    // this.reportService.getStocksReport().subscribe(
    //   data => {
    //     this.stocksData = data;
    //     this.updateStocksPieChart();
    //   },
    //   error => {
    //     console.error('Error fetching stocks data:', error);
    //   }
    // );

    // Fetch orders data
    // this.reportService.getOrderReport().subscribe(
    //   data => {
    //     this.ordersData = data;
    //     this.updateOrdersDonutChart();
    //   },
    //   error => {
    //     console.error('Error fetching orders data:', error);
    //   }
    // );
    
    constructor(private reportService: ReportService) { }

ngOnInit(): void {
  // Fetch stocks data
  this.reportService.getStocksReport().subscribe(
    (response: any) => {
      if (response && Array.isArray(response.stocklist)) {
        this.stocksData = response.stocklist;
        console.log(this.stocksData);
        this.updateStocksPieChart();  
      } else {
        console.error('Invalid or empty stocks data:', response);
      }
    },
    (error) => {
      console.error('Error loading stocks data:', error);
    }
  );

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
}



  updateStocksPieChart() {
    if (!Array.isArray(this.stocksData)) {
      console.error('Invalid or empty stocks data');
      return;
    }

    // const labels = this.stocksData.map(stock => stock.itemcategory);
    // const data = this.stocksData.map(stock => stock.itemname);

    // if (this.stocksData && this.stocksData.length > 0) {
    //   const categoryCounts: { [category: string]: number } = {};
  
    //   this.stocksData.forEach(item => {
    //     if (categoryCounts[item.itemCategory]) {
    //       categoryCounts[item.itemCategory]++;
    //     } else {
    //       categoryCounts[item.itemCategory] = 1;
    //     }
    //   });

      if (this.stocksData && this.stocksData.length > 0) {
        const categoryCounts: { [category: string]: number } = {};
    
        this.stocksData.forEach(item => {
          if (categoryCounts[item.order_date]) {
            categoryCounts[item.order_date]++;
          } else {
            categoryCounts[item.order_date] = 1;
          }
        });
    
  
      const labels = Object.keys(categoryCounts);
      const data = Object.values(categoryCounts);
      const backgroundColors = this.generateRandomColors(labels.length);


    const stocksChart = new Chart('stocksPieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stocks',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Add options as needed
      }
    });
  }  
  }  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
      colors.push(color);
    }
    return colors;
  }



  updateOrdersDonutChart() {
    if (!Array.isArray(this.ordersData)) {
      console.error('Invalid or empty orders data');
      return;
    }

    const labels = this.ordersData.map(order => order.productName);
    const data = this.ordersData.map(order => order.quantity);

    const ordersChart = new Chart('ordersDonutChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Add options as needed
      }
    });
  }
}
