import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { MonitorOrderComponent } from './monitor-order/monitor-order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { IncomingStockComponent } from './stocks/incoming-stock/incoming-stock.component';
import { StockAvailabilityComponent } from './stocks/stock-availability/stock-availability.component';
import { OutgoingStockComponent } from './stocks/outgoing-stock/outgoing-stock.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StockManagementComponent } from './stock-management.component';


// const routes: Routes = [
//   { path: 'stocklist', component: StockListComponent },
//   { path: 'monitororder', component: MonitorOrderComponent },
//   { path: 'placeorder', component: PlaceOrderComponent },
//   { path: 'shipments', component: ShipmentsComponent },
//   { path: 'incoming-stock', component: IncomingStockComponent },
//   { path: 'stock-availability', component: StockAvailabilityComponent },
//   { path: 'outgoing-stock', component: OutgoingStockComponent },
//   { path: '', redirectTo: '/stocklist', pathMatch: 'full' },
// ];


// const routes: Routes = [

// {
//   path: '',
//   component: StockManagementComponent,
//   children: [
//     { path: 'stocklist', component: StockListComponent },
//     { path: 'monitororder', component: MonitorOrderComponent },
//     { path: 'placeorder', component: PlaceOrderComponent },
//     { path: 'shipments', component: ShipmentsComponent },
//     { path: 'incoming-stock', component: IncomingStockComponent },
//     { path: 'stock-availability', component: StockAvailabilityComponent },
//     { path: 'outgoing-stock', component: OutgoingStockComponent },
//     { path: '', redirectTo: '/stocklist', pathMatch: 'full' },
//   ]
  
// }];
    // Add more routes for other components
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
 



const routes: Routes = [
  {
    path: '', component: StockManagementComponent, children: [
      { path: '', redirectTo: '/stocklist', pathMatch: 'full' },
      { path: 'stocklist', component: StockListComponent },
      { path: 'monitororder', component: MonitorOrderComponent },
      { path: 'placeorder', component: PlaceOrderComponent },
      { path: 'shipments', component: ShipmentsComponent },
      { path: 'stocks', children: [
        { path: 'incoming-stock', component: IncomingStockComponent },
        { path: 'stock-availability', component: StockAvailabilityComponent },
        { path: 'outgoing-stock', component: OutgoingStockComponent },
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class stockmanagementRoutingModule { }
