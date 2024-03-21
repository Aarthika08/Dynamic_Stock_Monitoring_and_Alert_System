// prediction.component.ts
// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { ModelService } from '../services/model.service';
import {StockService} from '../services/stock.service';
import { Observable } from 'rxjs';
import Chart from 'chart.js/auto'; // Import Chart.js
import { Subscription } from 'rxjs';
 

// interface Prediction {
//   index: number;
//   value: number;
//   isHighSales: boolean;
// }

interface Prediction {
  index: number;
  prediction: number;
  isHighSales: boolean;
  stockDetails: any; // Adjust the type accordingly
}
interface StockData {
  itemId: number;
  itemName: string;
  itemDescription: string;
  itemCategory: string;
  order_date: string;
  quantity: number;
  status: string;
  delete?: boolean;
  modified_date: string;
  history: { date: string; quantity: number }[];
  outgoingHistory: { date: string; quantity: number }[];
}

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  predictions: Prediction[] = [];
  loading: boolean = false;
  error: string | null = null;
  // @ViewChild('lineChart') private chartRef!: ElementRef;



  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchPredictions();

  }

  fetchPredictions(): void {
    this.loading = true;
    this.stockService.predictAndCheckHighSales().subscribe(
      predictions => {
        this.predictions = predictions.map(prediction => ({ ...prediction, stockDetails: null }));
        // Fetch stock details for each prediction
        this.fetchStockDetailsForPredictions();
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  fetchStockDetailsForPredictions(): void {
    this.predictions.forEach(prediction => {
      this.stockService.getStockItemByIndex(prediction.index).subscribe(
        (stockDetails: StockData | undefined) => {
          if (stockDetails) {
            prediction.stockDetails = stockDetails;
          } else {
            console.error('Stock details not found for prediction with index:', prediction.index);
          }
        },
        (error: any) => {
          console.error('Error fetching stock details:', error);
        }
      );
    });
  }
  
  // chart

  // ngAfterViewInit() {
  //   this.stockService.predictAndCheckHighSales().subscribe(predictions => {
  //     const chartData = {
  //       labels: predictions.map(prediction => prediction.index.toString()),
  //       datasets: [{
  //         label: 'Predicted Sales',
  //         data: predictions.map(prediction => prediction.prediction),
  //         backgroundColor: 'rgba(105, 0, 132, .2)',
  //         borderColor: 'rgba(200, 99, 132, .7)',
  //         borderWidth: 2
  //       }]
  //     };

  //     const chartOptions = {
  //       responsive: true,
  //       maintainAspectRatio: false
  //     };

  //     const ctx = this.chartRef.nativeElement.getContext('2d');
  //     new Chart(ctx, {
  //       type: 'pie',
  //       data: chartData,
  //       options: chartOptions
  //     });
  //   });
  // }
//   ngAfterViewInit() {
//     this.stockService.predictAndCheckHighSales().subscribe(predictions => {
//       const bubbleChartData = predictions.map(prediction => ({
//         x: prediction.index,
//         y: prediction.prediction,
//         r: prediction.prediction, // Bubble size based on predicted sales
//         backgroundColor: prediction.isHighSales ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
//         borderColor: prediction.isHighSales ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
//         label: "aaaa" // Label for the bubble
//       }));
  
//       const ctx = this.chartRef.nativeElement.getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           datasets: [{
//             data: bubbleChartData
//           }]
          
//         },
//         options: {
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom'
//             }
//           }
//         }
//       });
//     });
//   }
// }  

}