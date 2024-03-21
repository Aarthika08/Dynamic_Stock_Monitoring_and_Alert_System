// dynamic.module.ts
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { RouterModule } from '@angular/router';
import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import { NavComponent } from './navbar/nav.component';
import {DynamicComponent} from './dynamic.component';
import  {LandingPageComponent} from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PredictionComponent } from './prediction/prediction.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [StockMonitorComponent, NavComponent,DynamicComponent,LandingPageComponent,PredictionComponent],
  imports: [
    CommonModule,
    DynamicRoutingModule, // Import the routing module here
    RouterModule, 
     BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,FormsModule,MatSnackBarModule
  ]
})
export class DynamicModule { }
