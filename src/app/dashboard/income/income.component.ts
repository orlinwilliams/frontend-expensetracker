import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';

import { IncomeService } from 'src/app/services/dashboard/income.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['date', 'category', 'value', 'actions'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private incomeService: IncomeService,
    private currentUserService: CurrentUserService,
    private currentDateService: CurrentDateService
  ) {}
  ngOnInit(): void {
    this.getIncome();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  // saveIncome() {
  //   this.incomeService
  //     .createIncome(
  //       this.currentUserService.getUserId(),
  //       this.formCategory.value
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         this.getCategories();
  //         this.formCategory.reset();
  //       },
  //       (error) => console.log(error)
  //     );
  // }

  getIncome() {
    let data: any = {};
    this.currentDateService.currentDate$.subscribe((res: any) => {
      data = res;
    });
    this.incomeService
      .getIncome(this.currentUserService.getUserId(), data.month, data.year)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.dataSource.data = res.data.income;
        },
        (error) => console.log(error)
      );
  }

  getPropertyByPath(obj: any, pathString: string) {
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }
}
