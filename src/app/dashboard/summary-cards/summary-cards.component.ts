import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faCommentDollar,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ExpenseService } from 'src/app/services/dashboard/expense.service';
import { IncomeService } from 'src/app/services/dashboard/income.service';
@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css'],
})
export class SummaryCardsComponent implements OnInit, OnDestroy {
  //----------------icons------------------
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faCommentDollar = faCommentDollar;
  incomeSubscription: Subscription = new Subscription();
  expenseSubscription: Subscription = new Subscription();
  valueIncome: number = 0;
  valueExpense: number = 0;
  constructor(
    public incomeService: IncomeService,
    public expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.currentBalance();
  }
  currentBalance() {
    this.incomeSubscription = this.incomeService.currentTotalIncome$.subscribe(
      (res: number) => {
        this.valueIncome = res;
      }
    );
    this.expenseSubscription = this.expenseService.currentTotalExpense$.subscribe(
      (res: number) => {
        this.valueExpense = res;
      }
    );
  }
  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
  }
}
