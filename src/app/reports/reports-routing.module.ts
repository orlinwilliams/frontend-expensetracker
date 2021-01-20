import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeReportsComponent } from './home-reports/home-reports.component';

import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [{ path: '', component: HomeReportsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
