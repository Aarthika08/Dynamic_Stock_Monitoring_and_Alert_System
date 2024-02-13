import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
 import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {StockManagementComponent} from './stock-management/stock-management.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }, // Add route for admin-dashboard
  { path: 'stock-management', component: StockManagementComponent }, // Add route for admin-dashboard

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
