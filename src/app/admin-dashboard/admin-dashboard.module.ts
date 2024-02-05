import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { ReportAndAnalyticsComponent } from './report-and-analytics/report-and-analytics.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {SidebarComponent} from './sidebar/sidebar.component'
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    UserComponent,
    SupplierComponent,
    ProductComponent,
    OrderComponent,
    StockComponent,
    ReportAndAnalyticsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule

  ],
  exports: [
    AdminDashboardComponent // Ensure AdminDashboardComponent is exported
  ]
})
export class AdminDashboardModule { }
