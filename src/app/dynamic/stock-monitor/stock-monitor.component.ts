import { Component, OnInit } from '@angular/core';
// import { StockService } from '../services/stock.service';
//import {TensorflowService} from '../services/tensorflow.service';
// declare var ml5: any;
import { LinearRegression } from '../linear-regression';

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css']
})
export class StockMonitorComponent {
 // linear-regression.component.ts


  linearRegression = new LinearRegression();
  xValues = [1, 2, 3, 4, 5];
  yValues = [2, 3, 4, 5, 6];
  inputX!: number;
  prediction!: number;

  trainModel(): void {
    this.linearRegression.train(this.xValues, this.yValues);
  }

  predictValue(): void {
    this.prediction = this.linearRegression.predict(this.inputX);
  }
}
