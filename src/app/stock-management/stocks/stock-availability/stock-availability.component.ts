import { Component, OnInit } from '@angular/core';
import { StockAvailabilityService } from './stock-availability.service';

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrls: ['./stock-availability.component.css']
})
export class StockAvailabilityComponent implements OnInit {
  stockData: any;

  constructor(private stockService: StockAvailabilityService) { }

  ngOnInit(): void {
    this.getStockAvailability();
  }

  getStockAvailability(): void {
    this.stockService.getStockAvailability()
      .subscribe(
        data => {
          this.stockData = data;
        },
        error => {
          console.error('Error fetching stock data:', error);
        }
      );
  }
}
