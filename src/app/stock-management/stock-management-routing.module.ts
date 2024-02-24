import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { IncomingStockComponent } from './stocks/incoming-stock/incoming-stock.component';
import { StockAvailabilityComponent } from './stocks/stock-availability/stock-availability.component';
import { OutgoingStockComponent } from './stocks/outgoing-stock/outgoing-stock.component';


const routes: Routes = [
  { path: 'stocklist', component: StockListComponent },
  { path: 'monitororder', component: MonitorOrderComponent },
  { path: 'placeorder', component: PlaceOrderComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: 'incoming-stock', component: IncomingStockComponent },
  { path: 'stock-availability', component: StockAvailabilityComponent },
  { path: 'outgoing-stock', component: OutgoingStockComponent },
  { path: '', redirectTo: '/stocklist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class stockmanagementRoutingModule { }
