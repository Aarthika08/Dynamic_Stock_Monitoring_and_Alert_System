import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SupplierComponent } from './supplier/supplier.component';
// import { ProductComponent } from './product/product.component';
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
import {HttpClientModule } from  '@angular/common/http';
import{EditUserDialogComponent} from './user/edit-user-dialog/edit-user-dialog.component'
import {updateUserDialogComponent} from './supplier/update-user-dialog/update-user-dialog.component'
import {newsupplierDialogComponent} from './supplier/new-supplier-dialog/new-supplier-dialog.component'
import { AngularSlickgridModule } from 'angular-slickgrid';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashboardComponent,
    UserComponent,
    SupplierComponent,
    // ProductComponent,
    OrderComponent,
    StockComponent,
    ReportAndAnalyticsComponent,
    SidebarComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    updateUserDialogComponent,
    newsupplierDialogComponent
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
    HttpClientModule,
    AngularSlickgridModule.forRoot()

  ],
  exports: [
    AdminDashboardComponent // Ensure AdminDashboardComponent is exported
  ]
})
export class AdminDashboardModule { }