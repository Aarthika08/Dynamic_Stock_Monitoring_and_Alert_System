import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';

const routes: Routes = [
  { path: 'stocklist', component: StockListComponent },
  { path: 'monitororder', component: MonitorOrderComponent },
  { path: 'placeorder', component: PlaceOrderComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: '', redirectTo: '/stocklist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class stockmanagementRoutingModule { }
