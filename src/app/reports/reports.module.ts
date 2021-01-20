import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { HomeReportsComponent } from './home-reports/home-reports.component';


@NgModule({
  declarations: [ReportsComponent, HomeReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule  
  ]
})
export class ReportsModule { }
