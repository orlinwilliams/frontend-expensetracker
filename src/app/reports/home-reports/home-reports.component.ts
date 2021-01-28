import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';
import { ExpenseService } from 'src/app/services/dashboard/expense.service';

@Component({
  selector: 'app-home-reports',
  templateUrl: './home-reports.component.html',
  styleUrls: ['./home-reports.component.css'],
})
export class HomeReportsComponent implements OnInit {
  expenseSubscription: Subscription = new Subscription();
  titleCategories: Array<any> = [];
  expensesData: any = {};
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
  pieChartLabels: Label[] = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];

  constructor(
    private currentDateService: CurrentDateService,
    private expenseService: ExpenseService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.expenseService
          .getExpenses(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {
              console.log(res.data);
              console.log(this.dataToChart(res.data));
              this.expensesData = this.dataToChart(res.data);
            },
            (error) => console.log(error)
          );
      }
    );
  }

  dataToChart(data: any): object {
    const tags = this.getTags(data);
    const values = this.getValues(data, this.getTags(data));
    const renderItems = this.renderValues(tags, values);
    const total = this.totalValue(values);
    return {
      tags,
      values,
      renderItems,
      total,
    };
  }
  getTags(array: any): Array<string> {
    let tags: Array<string> = [];
    array.forEach((item: any) => {
      tags.push(item.category.title);
    });
    let tagsFinal = tags.filter((item: string, index: number) => {
      return tags.indexOf(item) === index;
    });
    return tagsFinal;
  }
  getValues(data: any, tags: any): Array<number> {
    let values: Array<number> = [];
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
  }
  renderValues(tags: Array<string>, values: Array<number>): Array<any> {
    let valuesFinal: any = [];
    for(let i = 0;i < tags.length;i++){
      valuesFinal.push({tag:tags[i],value:values[i]})
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
}
