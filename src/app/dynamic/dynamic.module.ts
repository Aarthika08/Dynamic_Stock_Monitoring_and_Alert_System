// dynamic.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { RouterModule } from '@angular/router';
import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import { NavComponent } from './navbar/nav.component';
import {DynamicComponent} from './dynamic.component';
import  {LandingPageComponent} from './landing-page/landing-page.component';
@NgModule({
  declarations: [StockMonitorComponent, NavComponent,DynamicComponent,LandingPageComponent],
  imports: [
    CommonModule,
    DynamicRoutingModule, // Import the routing module here
    RouterModule
  ]
})
export class DynamicModule { }
