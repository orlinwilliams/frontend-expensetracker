import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { DashboardModule } from '../dashboard/dashboard.module';

import { ReportsComponent } from './reports.component';
import { HomeReportsComponent } from './home-reports/home-reports.component';

@NgModule({
  declarations: [ReportsComponent, HomeReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ChartsModule,
    DashboardModule  
  ]
})
export class ReportsModule { }
