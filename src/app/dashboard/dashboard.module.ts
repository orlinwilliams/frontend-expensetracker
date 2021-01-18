import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SummaryCardsComponent,
    MonthCalendarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
})
export class DashboardModule {}
