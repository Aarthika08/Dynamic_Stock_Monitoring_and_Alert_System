import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import {StockManagementComponent} from './stock-management.component'
import {stockmanagementRoutingModule} from './stock-management-routing.module'

import { HttpClientModule } from '@angular/common/http';
import { IncomingStockComponent } from '../stock-management/stocks/incoming-stock/incoming-stock.component';
import { StockAvailabilityComponent } from '../stock-management/stocks/stock-availability/stock-availability.component';
import { OutgoingStockComponent } from '../stock-management/stocks/outgoing-stock/outgoing-stock.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StockListComponent,
    MonitorOrderComponent,
    PlaceOrderComponent,
    ShipmentsComponent,
    StockManagementComponent,IncomingStockComponent,StockAvailabilityComponent,OutgoingStockComponent
  ],
  imports: [
    CommonModule,stockmanagementRoutingModule,HttpClientModule,FormsModule
  ]
})
export class StockManagementModule { }
