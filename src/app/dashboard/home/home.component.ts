import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { ExpenseCategoriesService } from 'src/app/services/categories/expense-categories.service';
import { IncomeCategoriesService } from 'src/app/services/categories/income-categories.service';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';
import { ExpenseService } from 'src/app/services/dashboard/expense.service';
import { IncomeService } from 'src/app/services/dashboard/income.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  validatedSelectCategory: boolean = true;
  optionModal: string = '';
  incomeCategories: Array<any> = [];
  expenseCategories: Array<any> = [];
  formExpense = new FormGroup({
    value: new FormControl('', [Validators.required]),
    category: new FormControl('selectCategory', [Validators.required]),
  });
  formIncome = new FormGroup({
    value: new FormControl('', [Validators.required]),
    category: new FormControl('selectCategory', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private incomeCategoriesService: IncomeCategoriesService,
    private expenseCategoriesService:ExpenseCategoriesService,
    private currentUserService: CurrentUserService,
    private incomeService: IncomeService,
    private expenseService:ExpenseService,
    private currentDateService: CurrentDateService
  ) {}
  
  ngOnInit(): void {
    this.getIncomeCategories();
    this.getExpenseCategories();
  }
  
  openModal(modal: any, event: any): void {
    this.modalService.open(modal, { centered: true });
    this.validatedSelectCategory = true;
    if (event.target.outerText === 'Income') this.optionModal = 'Income';
    else if (event.target.outerText === 'Expense') this.optionModal = 'Expense';
  }
  validatorCategory(event: any):void {
    if (event.target.value != 'selectCategory')
      this.validatedSelectCategory = false;
    else this.validatedSelectCategory = true;
  }
  saveExpense():void {
    console.log(this.formatDataExpense());
    this.expenseService
      .createExpense(this.currentUserService.getUserId(), this.formatDataExpense())
      .subscribe(
        (res: any) => {
          this.formExpense.reset();
          this.eventRender();
        },
        (error) => console.log(error)
      );

  }

  saveIncome():void {
    this.incomeService
      .createIncome(this.currentUserService.getUserId(), this.formatDataIncome())
      .subscribe(
        (res: any) => {
          this.formIncome.reset();
          this.eventRender();
        },
        (error) => console.log(error)
      );
  }

  getIncomeCategories():void {
    this.incomeCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.incomeCategories = res.data.incomeCategories;
        },
        (error) => console.log(error)
      );
  }
  getExpenseCategories():void {
    this.expenseCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.expenseCategories = res.data.expenseCategories;          
        },
        (error) => console.log(error)
      );
  }
  eventRender():void {
    this.currentDateService.currentDate$.emit({
      month: this.formatDataIncome().date.month,
      year: this.formatDataIncome().date.year,
    });
  }
  formatDataIncome(): any {
    const data: any = {
      value: this.formIncome.get('value')?.value,
      category: this.formIncome.get('category')?.value,
      date: this.currentDateService.getDate(),
    };
    return data;
  }
  formatDataExpense(): any {
    const data: any = {
      value: this.formExpense.get('value')?.value,
      category: this.searchCategory(this.formExpense.get('category')?.value),
      date: this.currentDateService.getDate(),
    };
    return data;
  }
  searchCategory(id:string):object{
    const category:any = this.expenseCategories.filter(el => el._id === id )
    return category[0];
  }
  
}
