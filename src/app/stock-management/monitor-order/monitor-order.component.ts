import { Component } from '@angular/core';

@Component({
  selector: 'app-monitor-order',
  templateUrl: './monitor-order.component.html',
  styleUrls: ['./monitor-order.component.css']
})
export class MonitorOrderComponent {
  orders: string[] = [];

  orderPlaced(productName: string) {
    this.orders.push(productName);
  }
}
