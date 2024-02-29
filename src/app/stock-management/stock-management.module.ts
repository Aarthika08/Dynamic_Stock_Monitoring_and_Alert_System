import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import {StockManagementComponent} from './stock-management.component'

import { HttpClientModule } from '@angular/common/http';
import { IncomingStockComponent } from '../stock-management/stocks/incoming-stock/incoming-stock.component';
import { StockAvailabilityComponent } from '../stock-management/stocks/stock-availability/stock-availability.component';
import { OutgoingStockComponent } from '../stock-management/stocks/outgoing-stock/outgoing-stock.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {stockmanagementRoutingModule} from './stock-management-routing.module'
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {EditStockComponent} from '../stock-management/stock-list/edit-stock-folder/edit-stock.component'
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    EditStockComponent,
    StockListComponent,
    MonitorOrderComponent,
    PlaceOrderComponent,
    ShipmentsComponent,
    StockManagementComponent,IncomingStockComponent,
    StockAvailabilityComponent,OutgoingStockComponent,
     NavbarComponent
  ],
  imports: [
    CommonModule,MatMenuModule,
    stockmanagementRoutingModule,
        HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,MatDialogModule
  ]
})
export class StockManagementModule { }
