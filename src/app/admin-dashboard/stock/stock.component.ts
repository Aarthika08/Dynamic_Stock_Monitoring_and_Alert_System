// stock.component.ts

import { Component, OnInit } from '@angular/core';
import { StockService } from './stockservice';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockList!: any[];
  loading: boolean = true;
  error: any;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.fetchStockData();
  }

 

  fetchStockData(): void {
    this.stockService.getStockList().subscribe(data => {
      this.stockList = data.stocklist;
    },
    error => {
      this.error = error.message || 'Unknown error occurred';
      this.loading = false;
    }
  );
}
}