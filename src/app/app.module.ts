import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import {FormsModule} from '@angular/forms';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import {RealTimeModule} from './real-time/real-time.module';
import { StockManagementModule } from './stock-management/stock-management.module';
//import { ChartsModule } from 'ng2-charts'; // Import ChartsModule

@NgModule({
  declarations: [
    AppComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminDashboardModule,
    BrowserAnimationsModule ,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RealTimeModule,StockManagementModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
