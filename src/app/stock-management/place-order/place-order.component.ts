
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  @Output() orderPlaced = new EventEmitter<string>();
  productName: string = '';

  placeOrder() {
    if (this.productName.trim()) {
      this.orderPlaced.emit(this.productName);
      this.productName = '';
    }
  }
}
