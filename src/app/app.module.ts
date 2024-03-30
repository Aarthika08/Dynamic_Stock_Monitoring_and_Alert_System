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
import { StockManagementModule } from './stock-management/stock-management.module';
import { DynamicModule } from './dynamic/dynamic.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import {slickgridComponent} from './slickgrid/slickgrid.component';
import { AngularSlickgridModule } from 'angular-slickgrid';


@NgModule({
  declarations: [
    AppComponent,LoginComponent,slickgridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminDashboardModule,
    BrowserAnimationsModule ,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StockManagementModule,
    DynamicModule,MatToolbarModule,MatButtonModule,
    AngularSlickgridModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
