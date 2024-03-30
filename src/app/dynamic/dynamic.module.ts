// dynamic.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { RouterModule } from '@angular/router';
import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import  {LandingPageComponent} from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PredictionComponent } from './prediction/prediction.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {GraphDialogComponent} from './prediction/graph-dialog/graph-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {aboutComponent} from './about/about.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {NavComponent} from './navbar/navbar.component';
import {DynamicComponent} from './dynamic.component';
import {OrderComponent} from './monitor-order/monitor-order.component';
import {alerthistoryComponent} from './alerthistory/alerthistory.component';
@NgModule({
  declarations: [
    StockMonitorComponent,     
     DynamicComponent,
     LandingPageComponent,
     PredictionComponent,
    GraphDialogComponent,
    aboutComponent,
    NavComponent,
    OrderComponent,
    alerthistoryComponent
  ],
    
  imports: [
    CommonModule,
    DynamicRoutingModule, // Import the routing module here
    RouterModule, 
     BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class DynamicModule { }
