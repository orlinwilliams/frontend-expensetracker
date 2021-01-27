import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { IncomeCategoriesService } from 'src/app/services/categories/income-categories.service';
import { IncomeService } from 'src/app/services/dashboard/income.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit,AfterViewInit {
  

  faPlusCircle = faPlusCircle;
  validatedSelectCategory: boolean = true;
  optionModal: string = '';
  incomeCategories: Array<any> = [];
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
    private currentUserService: CurrentUserService,
    private incomeService: IncomeService
  ) {}
  ngOnInit(): void {
    this.getIncomeCategories();
    //this.getIncomes({});
  }
  ngAfterViewInit() {
        
  }

  openModal(modal: any, event: any): void {
    this.modalService.open(modal, { centered: true });
    this.validatedSelectCategory = true;
    if (event.target.outerText === 'Income') this.optionModal = 'Income';
    else if (event.target.outerText === 'Expense') this.optionModal = 'Expense';
  }
  validatorCategory(event: any) {
    if (event.target.value != 'selectCategory')
      this.validatedSelectCategory = false;
    else this.validatedSelectCategory = true;
  }
  saveExpense() {
    console.log(this.formExpense.value);
  }
  saveIncome() {
    console.log(this.formIncome.value);
    const data = {
      value: this.formIncome.get('value')?.value,
      category: this.formIncome.get('category')?.value,
      date: this.getDate(),
    };

    this.incomeService
      .createIncome(this.currentUserService.getUserId(), data)
      .subscribe(
        (res: any) => {
          this.formIncome.reset();
          //this.renderIncome?.getIncome();
        },
        (error) => console.log(error)
      );
  }
  getIncomeCategories() {
    this.incomeCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.incomeCategories = res.data.incomeCategories;
        },
        (error) => console.log(error)
      );
  }
  getDate(): object {
    const date = new Date();
    const dateJson = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    return dateJson;
  }
  getIncomes(date:any){
    
  }
}
