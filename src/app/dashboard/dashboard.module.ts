import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SummaryCardsComponent,
    MonthCalendarComponent,
    ExpensesComponent,
    IncomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    AngularMaterialModule    
  ],
  exports:[MonthCalendarComponent,]
})
export class DashboardModule {}
