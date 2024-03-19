// prediction.component.ts
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../services/model.service';
import {StockService} from '../services/stock.service';
import { Observable } from 'rxjs';

interface Prediction {
  index: number;
  value: number;
  isHighSales: boolean;
}

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  // export class PredictionComponent  {
    
  predictedSales!: number[];
  isHighSales!: boolean;
  predictions$!: Observable<{
stockName: any; prediction: number, isHighSales: boolean 
}[]>;
//2
predictions: { stockName: string, prediction: number, isHighSales: boolean }[] = [];
errorMessage: string = '';
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    // this.predictSales();
    // this.predictions$ = this.stockService.predictAndCheckHighSales();

    this.predictAndCheckHighSales();
  }

  // predictSales(): void {
  //   this.stockService.predictSales().subscribe(
  //     ({ predictedSales, isHighSales }) => {
  //       this.predictedSales = predictedSales;
  //       this.isHighSales = isHighSales;
  //       console.log('ps:',this.predictedSales, 'HS',this.isHighSales);
  //     },
  //     error => {
  //       console.error('Error predicting sales:', error);
  //     }
  //   );
  // }

  // predictAndCheckHighSales(): void {
  //   this.stockService.predictAndCheckHighSales();
  // }


  // predictAndCheckHighSales(): void {
  //   this.predictions$ = this.stockService.predictAndCheckHighSales();
  // }
 

//2
 
  predictAndCheckHighSales(): void {
    this.stockService.predictAndCheckHighSales().subscribe(
      predictions => {
        this.predictions = predictions;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}


