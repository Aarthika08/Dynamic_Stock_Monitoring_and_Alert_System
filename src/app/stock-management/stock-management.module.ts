import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import {StockManagementComponent} from './stock-management.component'
import {stockmanagementRoutingModule} from './stock-management-routing.module'

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StockListComponent,
    MonitorOrderComponent,
    PlaceOrderComponent,
    ShipmentsComponent,
    StockManagementComponent
  ],
  imports: [
    CommonModule,stockmanagementRoutingModule,HttpClientModule
  ]
})
export class StockManagementModule { }
