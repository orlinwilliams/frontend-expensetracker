import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { IncomeCategoriesService } from 'src/app/services/categories/income-categories.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';

import { IncomeService } from 'src/app/services/dashboard/income.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit, AfterViewInit, OnDestroy {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['date', 'category', 'value', 'actions'];
  idCurrentIncome: string = '';
  currentIncome: any = { value: '', category: '' };
  incomeSubscription: Subscription = new Subscription();
  incomeCategories: Array<any> = [];
  editButtonDisable: boolean = false;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private incomeService: IncomeService,
    private currentUserService: CurrentUserService,
    private currentDateService: CurrentDateService,
    private modalService: NgbModal,
    private incomeCategoriesService: IncomeCategoriesService
  ) {}

  ngOnInit(): void {
    this.getIncome();
    this.getIncomeCategories();
  }

  //----------- init sort datable--------
  ngAfterViewInit():any {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }
  getPropertyByPath(obj: any, pathString: string):any {
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }
  //-----------end sort datable--------

  getIncome():void {
    this.incomeSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.incomeService
          .getIncome(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {              
              this.dataSource.data = res.data;
              this.totalIncome(this.dataSource.data);
            },
            (error) => console.log(error)
          );
      }
    );
  }
  getAnIncome(idIncome: string):void {
    this.incomeService
      .getAnIncome(this.currentUserService.getUserId(), idIncome)
      .subscribe(
        (res: any) => {
          this.currentIncome.value = res.data.value;
          this.currentIncome.category = res.data.category;
        },
        (error) => console.log(error)
      );
  }
  getLocalIncome(date: any):void {
    this.incomeService
      .getIncome(this.currentUserService.getUserId(), date.month, date.year)
      .subscribe(
        (res: any) => {
          this.dataSource.data = res.data;
          this.totalIncome(this.dataSource.data);
        },
        (error) => console.log(error)
      );
  }

  openModalEdit(modal: any, idIncome: string):void {
    this.editButtonDisable = false;
    this.modalService.open(modal, { centered: true });
    this.idCurrentIncome = idIncome;
    this.getAnIncome(idIncome);
  }
  validateIncomeValue():void {
    if (this.currentIncome.value == null || this.currentIncome.value == 0)
      this.editButtonDisable = true;
    else this.editButtonDisable = false;
  }
  updateAnIncome():void {
    this.incomeService
      .updateAnIncome(
        this.currentUserService.getUserId(),
        this.idCurrentIncome,
        this.currentIncome
      )
      .subscribe(
        (res: any) => {
          if (res.data.nModified) {
            this.getLocalIncome(this.currentDateService.getDate());
            this.modalService.dismissAll();
          }
        },
        (error) => console.log(error)
      );
  }

  openModalDelete(modal: any, idIncome: string):void {
    this.modalService.open(modal, { centered: true, size: 'sm' });
    this.idCurrentIncome = idIncome;
  }
  deleteAnIncome():void {
    this.incomeService
      .deleteAnIncome(this.currentUserService.getUserId(), this.idCurrentIncome)
      .subscribe(
        (res: any) => {
          if (res.data.nModified) {
            this.getLocalIncome(this.currentDateService.getDate());
            this.idCurrentIncome = '';
            this.modalService.dismissAll();
          }
        },
        (error) => console.log(error)
      );
  }

  getIncomeCategories(): void {
    this.incomeCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.incomeCategories = res.data.incomeCategories;
        },
        (error) => console.log(error)
      );
  }
  totalIncome(income: any):void {
    let total: number = 0;
    income.forEach((element: any) => {
      total += element.value;
    });
    this.incomeService.currentTotalIncome$.emit(total);
  }
  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
  }
}
