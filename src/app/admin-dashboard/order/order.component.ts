import { Component, OnInit, ViewChild } from '@angular/core';
import {OrderlistService } from './orderlist.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  //  orders!: any[];
  orderList!: any[];
  
  orders: any[] = [];

  displayedColumns: string[] = ['order_id','customer_id', 'stock_name', 'order_date', 'order_status','price','stock_quantity','product_name','total_price'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator?: MatPaginator ;

  constructor(private orderService: OrderlistService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: any) => {
        if (data?.orderslist) {
          this.orders = data.orderslist;
          this.dataSource = new MatTableDataSource(data.orderslist);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
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
