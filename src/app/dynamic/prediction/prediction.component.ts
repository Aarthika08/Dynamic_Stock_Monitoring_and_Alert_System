// prediction.component.ts
// import { Component, OnInit } from '@angular/core';
import { Component,AfterViewInit, ElementRef, ViewChild ,OnInit} from '@angular/core';

import { ModelService } from '../services/model.service';
import {StockService} from '../services/stock.service';
import { Observable } from 'rxjs';
 import Chart from 'chart.js/auto'; // Import Chart.js
import { Subscription } from 'rxjs';
declare let Email: any;
import { StocksService } from '../../stock-management/stock-list/stock-list.service'
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GraphDialogComponent } from './graph-dialog/graph-dialog.component';

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
interface StockItem {
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
  salesRate?: number;
  // Add any other properties as needed
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

  selectedPrediction: Prediction | null = null; // Store selected prediction
  chart: any;
  data: any;
  itemId!: number;
  databaseData: any;
  // stockData: any;
  errorMessage!: any;
  stockData: StockItem[] = []; 
  constructor(private stockService: StockService,private dialog: MatDialog,private stocksService: StocksService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPredictions();
    // this.fetchData();
    
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
  // Function to select a prediction and store its details

 // Function to select a prediction and store its details
 selectPrediction(prediction: Prediction): void {
  this.selectedPrediction = prediction;
}

// Function to send email with selected prediction details


// Function to send email with selected prediction details
sendEmail(selectedPrediction: Prediction): void {
  if (!selectedPrediction) { // Check if selectedPrediction is null
    console.error('No prediction selected.');
    return;
  }

  const stockDetails = selectedPrediction.stockDetails;
  if (!stockDetails) {
    console.error('Stock details not available for the selected prediction.');
    return;
  }

  const emailBody = `Stock Name: ${stockDetails.itemName}, Prediction Value: ${selectedPrediction.prediction}`;

  Email.send({
    
    Body: emailBody
  }).then(
    (message: unknown) => {
      console.log(message); // Log the message to the console
      alert("Email sent successfully");
    }
  ).catch((error: any) => {
    console.error('Error sending email:', error);
    alert("Error sending email. Please try again later.");
  });
}

//chart

openGraphDialog(itemId: number): void {
  if (!itemId) {
    console.error('ItemId is not set.');
    return;
  }

  this.stocksService.getStockList().subscribe(data => {
    if (Array.isArray(data)) {
      const item = data.find(item => item.itemId === itemId);
      if (item) {
        const dialogRef = this.dialog.open(GraphDialogComponent, {
          width: '1600px',height:'500px',
          data: item // Pass fetched item data to the dialog
        });
      } else {
        console.error('Item not found');
      }
    } else if (data && data.stock) { // Check if 'stock' property exists in data
      const item = data.stock.find((item:any) => item.itemId === itemId);
      if (item) {
        const dialogRef = this.dialog.open(GraphDialogComponent, {
          width: '600px',
          data: item // Pass fetched item data to the dialog
        });
      } else {
        console.error('Item not found');
      }
    } else {
      console.error('Data is not in the expected format');
    }
  });
}



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

