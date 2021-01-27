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
  incomeSubscription: Subscription = new Subscription();
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private incomeService: IncomeService,
    private currentUserService: CurrentUserService,
    private currentDateService: CurrentDateService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getIncome();
  }

  //----------- init sort datable--------
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }
  getPropertyByPath(obj: any, pathString: string) {
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }
  //-----------end sort datable--------

  getIncome() {
    this.incomeSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.incomeService
          .getIncome(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {
              this.dataSource.data = res.data;
              console.log(res);
            },
            (error) => console.log(error)
          );
      }
    );
  }
  getLocalIncome(date:any) {
    this.incomeService
      .getIncome(this.currentUserService.getUserId(), date.month, date.year)
      .subscribe(
        (res: any) => {
          this.dataSource.data = res.data;          
        },
        (error) => console.log(error)
      );
  }

  openModalEdit(modal:any, idIncome:string){
    this.modalService.open(modal,{centered:true} );
    this.idCurrentIncome = idIncome;
  }
  updateAnIncome(idIncome: string) {
    console.log(idIncome);
  }

  openModalDelete(modal: any, idIncome: string) {
    this.modalService.open(modal, { centered: true, size: 'sm' });
    this.idCurrentIncome = idIncome;
    
  }
  deleteAnIncome() {
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
  
  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
  }
}
