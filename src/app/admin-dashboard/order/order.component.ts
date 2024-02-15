import { Component,OnInit } from '@angular/core';
import {OrderlistService } from './orderlist.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders!: any[];
  orderList!: any[];

  constructor(private orderService: OrderlistService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: any) => {
        if (data && data.orderslist) {
          this.orders = data.orderslist;
        } else {
          console.error('Invalid data format. Expected orderslist array.');
        }
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        console.log('Order deleted successfully.');
        this.loadOrders();
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }
}
