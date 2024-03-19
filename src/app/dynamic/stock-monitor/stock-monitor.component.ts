import { Component, OnInit } from '@angular/core';
 import { StockmonitorService } from '../stock-monitor/stock-monitor.service';
//import {TensorflowService} from '../services/tensorflow.service';
// declare var ml5: any;
import { LinearRegression } from '../linear-regression';

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css']
})
export class StockMonitorComponent {
  stockData: any[] = [];

  constructor(private stockmonitorService: StockmonitorService) { }

  ngOnInit(): void {
    this.fetchStockData();
  }

  fetchStockData(): void {
    this.stockmonitorService.fetchStockData().subscribe(
      (data: any[]) => {
        // Handle the fetched data here
        console.log(data);
      },
      (error) => {
        // Handle error if any
        console.error('Error fetching stock data:', error);
      }
    );
  }
}