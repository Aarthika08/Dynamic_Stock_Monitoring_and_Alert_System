// dynamic/dynamic-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockMonitorComponent } from './stock-monitor/stock-monitor.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },

  { path: 'stock-monitor', component: StockMonitorComponent },
  { path: '**', redirectTo: 'landing-page', pathMatch: 'full' } // Redirect any invalid routes to home
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicRoutingModule { }
