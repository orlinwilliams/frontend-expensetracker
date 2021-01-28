import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { ExpenseCategoriesService } from 'src/app/services/categories/expense-categories.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';
import { ExpenseService } from 'src/app/services/dashboard/expense.service';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  expenseSubscription: Subscription = new Subscription();
  displayedColumns: string[] = ['date', 'category', 'value', 'actions']
  currtenCategory: any = {};
  expenseCategories: Array<any> = [];
  
  idCurrentExpense: string = '';
  dataSource = new MatTableDataSource();
  formEditExpense = new FormGroup({
    value: new FormControl('',[Validators.required,Validators.minLength(1)]),
    category: new FormControl('',[Validators.required]),
  });
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private expenseService: ExpenseService,
    private currentUserService: CurrentUserService,
    private currentDateService: CurrentDateService,
    private modalService: NgbModal,
    private expenseCategoriesService: ExpenseCategoriesService
  ) {}
  ngOnInit(): void {
    this.getExpenses();
    this.getExpenseCategories();
  }
  //----------- init sort datable--------
  ngAfterViewInit(): any {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }
  getPropertyByPath(obj: any, pathString: string): any {
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }
  //----------- end sort datable--------
  getExpenses(): void {
    this.expenseSubscription = this.currentDateService.currentDate$.subscribe(
      (res: any) => {
        this.expenseService
          .getExpenses(this.currentUserService.getUserId(), res.month, res.year)
          .subscribe(
            (res: any) => {
              this.dataSource.data = res.data;
              this.totalExpense(this.dataSource.data);
            },
            (error) => console.log(error)
          );
      }
    );
  }
  getLocalExpense(date: any): void {
    this.expenseService
      .getExpenses(this.currentUserService.getUserId(), date.month, date.year)
      .subscribe(
        (res: any) => {
          this.dataSource.data = res.data;
          this.totalExpense(this.dataSource.data);
        },
        (error) => console.log(error)
      );
  }
  getExpense(idExpense: string): void {
    this.expenseService
      .getExpense(this.currentUserService.getUserId(), idExpense)
      .subscribe(
        (res: any) => {          
          this.formEditExpense.setValue({
            value: res.data.value,
            category: res.data.category._id,
          });
        },
        (error) => console.log(error)
      );
  }
  openModalEdit(modal: any, idExpense: string): void {
    this.modalService.open(modal, { centered: true });
    this.idCurrentExpense = idExpense;
    this.getExpense(idExpense);
  }
  getExpenseCategories(): void {
    this.expenseCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.expenseCategories = res.data.expenseCategories;
        },
        (error) => console.log(error)
      );
  }
  
  updateExpense(): void {    
    console.log(this.formatDataExpense());
    this.expenseService
      .updatexpense(
        this.currentUserService.getUserId(),
        this.idCurrentExpense,
        this.formatDataExpense()
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.data.nModified) {
            this.getLocalExpense(this.currentDateService.getDate());
            this.modalService.dismissAll();
          }
        },
        (error) => console.log(error)
      );
  }
  formatDataExpense(): any {
    const data: any = {
      value: this.formEditExpense.get('value')?.value,
      category: this.searchCategory(),
    };
    return data;
  }
  openModalDelete(modal: any, idIExpense: string): void {
    this.modalService.open(modal, { centered: true, size: 'sm' });
    this.idCurrentExpense = idIExpense;
  }
  deleteExpense(): void {
    this.expenseService
      .deleteExpense(this.currentUserService.getUserId(), this.idCurrentExpense)
      .subscribe(
        (res: any) => {
          if (res.data.nModified) {
            this.getLocalExpense(this.currentDateService.getDate());
            this.idCurrentExpense = '';
            this.modalService.dismissAll();
          }
        },
        (error) => console.log(error)
      );
  }
  
  searchCategory() {
    const category: any = this.expenseCategories.filter(
      (el) => el._id == this.formEditExpense.get('category')?.value
    );
    return category[0];
  }
  totalExpense(expense: any):void {
    let total: number = 0;
    expense.forEach((element: any) => {
      total += element.value;
    });
    this.expenseService.currentTotalExpense$.emit(total);
  }
  
  ngOnDestroy(): void {
    this.expenseSubscription.unsubscribe();
  }
}
