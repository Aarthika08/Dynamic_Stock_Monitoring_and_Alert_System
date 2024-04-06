
import { Component,OnInit} from '@angular/core';
import {StockService} from '../services/stock.service';
declare let Email: any;
import { StocksService } from '../../stock-management/stock-list/stock-list.service'
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GraphDialogComponent } from './graph-dialog/graph-dialog.component';
import {EmailHistoryService} from  "./email-history.service";

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

  selectedPrediction: Prediction | null = null; // Store selected prediction
  chart: any;
  data: any;
  itemId!: number;
  databaseData: any;
  errorMessage!: any;
  stockData: StockItem[] = []; 
  constructor(private stockService: StockService,private dialog: MatDialog,private stocksService: StocksService,private http: HttpClient,private emailHistoryService:EmailHistoryService) {}

  ngOnInit(): void {
    this.fetchPredictions();
    
  }

 
  fetchPredictions(): void {
    this.loading = true;
    this.stockService.predictAndCheckHighSales().subscribe(
      predictions => {
        this.predictions = predictions.map(prediction => ({ ...prediction, stockDetails: null }));
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
 
 selectPrediction(prediction: Prediction): void {
  this.selectedPrediction = prediction;
}

sendEmail(selectedPrediction: Prediction): void {
  if (!selectedPrediction) { 
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
        Host: "smtp.elasticemail.com",
    Username: "19ifte048@ldc.edu.in",
    Password: "0C589BEA17D93DD3B70BE7D58EBE02BC3CBA",
    To: 'maarthika01@gmail.com',
    From: "19ifte048@ldc.edu.in",
    Subject: "Stock Prediction",
    Body: emailBody
  }).then(
    (message: unknown) => {
      console.log(message); 
      alert("Email sent successfully");

         const emailData = {
          prediction: selectedPrediction.isHighSales?"High":"Low",
          stockName: stockDetails.itemName,
          sentAt: new Date().toISOString(), 
          subject:"Stock Prediction",
          sendto  :'maarthika01@gmail.com',
          sent:message
        };
        this.addToEmailHistory(emailData);

      }
  ).catch((error: any) => {
    console.error('Error sending email:', error);
    alert("Error sending email. Please try again later.");
  });
}

addToEmailHistory(emailData: any): void {
  this.emailHistoryService.addEmailToHistory(emailData).subscribe(
    response => {
      console.log('Email added to history successfully:', response);
    },
    error => {
      console.error('Error adding email to history:', error);
    }
  );
}


openGraphDialog(itemId: number): void {
  if (!itemId) {
    console.error('ItemId is not set.');
    return;
  }

  this.stocksService.getStockList().subscribe(data => {
    if (Array.isArray(data)) {
      const item = data.find(item => item.itemId === itemId);
      if (item) {
        let dialogRef = this.dialog.open(GraphDialogComponent, {
          width: '1600px',height:'500px',
          data: item // Pass fetched item data to the dialog
        });
      } else {
        console.error('Item not found');
      }
    } else if (data?.stock) { // Check if 'stock' property exists in data
      const item = data.stock.find((item:any) => item.itemId === itemId);
      if (item) {
        let dialogRef = this.dialog.open(GraphDialogComponent, {width: '600px',data: item});
      } else {
        console.error('Item not found');
      }
    } else {
      console.error('Data is not in the expected format');
    }
  });
}

}
  
