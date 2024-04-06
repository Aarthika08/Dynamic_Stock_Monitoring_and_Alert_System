// admin-dashboard/admin-dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { SupplierComponent} from './supplier/supplier.component';
import { StockComponent } from './stock/stock.component';
import { ReportAndAnalyticsComponent } from './report-and-analytics/report-and-analytics.component';
import { LogoutComponent } from '../login/logout.component';


const routes: Routes = [

  {
    path: '',    component: AdminDashboardComponent,children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'supplier', component: SupplierComponent },
       
        { path: 'orders', component: OrderComponent },
        { path: 'stock', component: StockComponent },
        { path: 'reportandanalytics', component: ReportAndAnalyticsComponent },
        { path: 'logout', component: LogoutComponent },
  
      // Add more routes for other components
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
// const routes: Routes = [
//   {
//     path: '', component: AdminDashboardComponent, children: [
//       { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// { path: 'dashboard', component: DashboardComponent },
// { path: 'user', component: UserComponent },
//       { path: 'dashboard', component: SupplierComponent },
//       { path: 'monitororder', component: OrderComponent },
//       { path: 'placeorder', component: StockComponent },
//       { path: 'shipments', component: ReportAndAnalyticsComponent },
//      
//       { path: 'logout', component: LogoutComponent },
  
    
//     ]
//   }
// ];


@NgModule({
  // imports: [RouterModule.forChild(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }