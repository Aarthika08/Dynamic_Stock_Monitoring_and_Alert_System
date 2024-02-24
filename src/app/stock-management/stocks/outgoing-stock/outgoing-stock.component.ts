import { Component, OnInit } from '@angular/core';
import { OutgoingStockService } from '../outgoing-stock/outgoing-stock.service';

@Component({
  selector: 'app-outgoing-stock',
  templateUrl: './outgoing-stock.component.html',
  styleUrls: ['./outgoing-stock.component.css']
})
export class OutgoingStockComponent implements OnInit {

  constructor(private outgoingStockService: OutgoingStockService) { }

  ngOnInit(): void {
  }

  removeOutgoingStock(quantityInput: HTMLInputElement) {
    const quantity = parseInt(quantityInput.value, 10); // Parse input value to number
    this.outgoingStockService.removeOutgoingStock(quantity);
  }
}
