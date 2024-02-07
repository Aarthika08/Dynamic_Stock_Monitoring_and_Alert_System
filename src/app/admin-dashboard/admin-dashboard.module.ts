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
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import both FormsModule and ReactiveFormsModule
import { AddUserDialogComponent } from './user/add-user-dialog/add-user-dialog.component';

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
    SidebarComponent,AddUserDialogComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule, // Import FormsModule here
      
  ],
  exports: [
    AdminDashboardComponent // Ensure AdminDashboardComponent is exported
  ]
})
export class AdminDashboardModule { }