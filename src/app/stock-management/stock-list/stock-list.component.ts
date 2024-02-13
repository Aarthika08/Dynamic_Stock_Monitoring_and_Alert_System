import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service'; // Update the path

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stockList!: any[];
  loading: boolean = true;
  error: any;
  
  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.fetchStockData();
  }

 

  fetchStockData(): void {
    this.stocksService.getStockList().subscribe(data => {
      this.stockList = data.stocklist;
    });
  }

 
}