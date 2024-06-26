import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
 import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {StockManagementComponent} from './stock-management/stock-management.component';
import { AuthGuard } from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import { LogoutComponent } from './login/logout.component';
import { AdminAuthGuard } from './admin-dashboard/admin-auth.guard';
import {stockAuthGuard} from './stock-management/stock-auth.guard';
import {DynamicComponent} from './dynamic/dynamic.component';
import {RealAuthGuard} from './dynamic/real-auth.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate: [AdminAuthGuard]  }, 
  { path: 'stock-management', component: StockManagementComponent,canActivate: [stockAuthGuard]  }, 
  { path: 'dynamic', component: DynamicComponent,canActivate: [RealAuthGuard]  }, 
  

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
