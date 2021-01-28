import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';
import { ExpenseService } from 'src/app/services/dashboard/expense.service';
import { IncomeService } from 'src/app/services/dashboard/income.service';

@Component({
  selector: 'app-home-reports',
  templateUrl: './home-reports.component.html',
  styleUrls: ['./home-reports.component.css'],
})
export class HomeReportsComponent implements OnInit, OnDestroy {
  expenseSubscription: Subscription = new Subscription();
  incomeSubscription: Subscription = new Subscription();
  expensesData: any = {};
  incomeData: any = {};
  
  pieChartLabelsExpense: Label[] = [];
  pieChartDataExpense: number[] = [];
  pieChartColorsExpense: any = [];
  pieChartLabelsIncome: Label[] = [];
  pieChartDataIncome: number[] = [];
  pieChartColorsIncome: any = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  constructor(
    private currentDateService: CurrentDateService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private currentUserService: CurrentUserService
  ) {}
  
  ngOnInit(): void {
    this.getExpenses();
    this.getIncome();
  }

  getExpenses(): void {
    this.expenseSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.expenseService
          .getExpenses(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {
              this.expensesData = this.dataToChart(res.data, 'expense');            
              this.createChartExpense(
                this.expensesData.tags,
                this.expensesData.values
              );
            },
            (error) => console.log(error)
          );
      }
    );
  }
  getIncome(): void {
    this.incomeSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.incomeService
          .getIncome(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {
              this.incomeData = this.dataToChart(res.data, 'income');              
              this.createChartIncome(
                this.incomeData.tags,
                this.incomeData.values
              );
            },
            (error) => console.log(error)
          );
      }
    );
  }
  createChartExpense(labels: Label[], values: number[]) {
    this.pieChartLabelsExpense = labels;
    this.pieChartDataExpense = values;
    this.pieChartColorsExpense = [
      {
        backgroundColor: [
          'rgba(255, 116, 0   ,0.5)',
          'rgba(220, 0, 255    ,0.5)',
          'rgba(255, 0, 66  ,0.5)',
        ],
      },
    ];
  }
  createChartIncome(labels: Label[], values: number[]) {
    this.pieChartLabelsIncome = labels;
    this.pieChartDataIncome = values;
    this.pieChartColorsIncome = [
      {
        backgroundColor: [
          'rgba(0, 255, 31 ,0.5)',
          'rgba(0, 251, 255 ,0.5)',
          'rgba(0, 62, 255 ,0.5)',
        ],
      },
    ];
  }
  dataToChart(data: any, type: string): object {
    const tags = this.getTags(data, type);
    const values = this.getValues(data, tags, type);
    const renderItems = this.renderValues(tags, values);
    const total = this.totalValue(values);
    return {
      tags,
      values,
      renderItems,
      total,
    };
  }
  getTags(array: any, type: string): Array<string> {
    let tags: Array<string> = [];
    if (type == 'expense') {
      array.forEach((item: any) => {
        tags.push(item.category.title);
      });
      let tagsFinal = tags.filter((item: string, index: number) => {
        return tags.indexOf(item) === index;
      });
      return tagsFinal;
    } else if (type == 'income') {
      array.forEach((item: any) => {
        tags.push(item.category);
      });
      let tagsFinal = tags.filter((item: string, index: number) => {
        return tags.indexOf(item) === index;
      });
      return tagsFinal;
    }
    return tags;
  }
  getValues(data: any, tags: any, type: string): Array<number> {
    let values: Array<number> = [];
    if (type == 'expense') {
      tags.forEach((item: string) => {
        let valueCategory = 0;
        data.forEach((el: any) => {
          if (el.category.title == item) {
            valueCategory += el.value;
          }
        });
        values.push(valueCategory);
      });
      return values;
    } else if (type == 'income') {
      tags.forEach((item: string) => {
        let valueCategory = 0;
        data.forEach((el: any) => {
          if (el.category == item) {
            valueCategory += el.value;
          }
        });
        values.push(valueCategory);
      });
      return values;
    }
    return values;
  }
  renderValues(tags: Array<string>, values: Array<number>): Array<any> {
    let valuesFinal: any = [];
    for (let i = 0; i < tags.length; i++) {
      valuesFinal.push({ tag: tags[i], value: values[i] });
    }
    return valuesFinal;
  }
  totalValue(data: Array<number>): number {
    let total: number = 0;
    data.forEach((el: number) => {
      total += el;
    });
    return total;
  }
  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
  }
}
