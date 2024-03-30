// dynamic/dynamic-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { PredictionComponent } from './prediction/prediction.component';
import {aboutComponent} from './about/about.component';
import { LogoutComponent } from '../login/logout.component';
import {OrderComponent} from './monitor-order/monitor-order.component';
import {alerthistoryComponent} from './alerthistory/alerthistory.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'about', component: aboutComponent },
  { path: 'prediction', component: PredictionComponent },
  { path: 'orderlist', component: OrderComponent },
  { path: 'alerthistory', component: alerthistoryComponent },

  { path: 'logout', component: LogoutComponent },


  { path: '**', redirectTo: 'landing-page', pathMatch: 'full' } // Redirect any invalid routes to home
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicRoutingModule { }
