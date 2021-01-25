import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { IncomeCategoriesService } from 'src/app/services/categories/income-categories.service';
@Component({
  selector: 'app-income-category',
  templateUrl: './income-category.component.html',
  styleUrls: ['./income-category.component.css'],
})
export class IncomeCategoryComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  showButtonIncome: boolean = false;
  showTable:boolean = false;
  incomeCategories:any = [];
  formCategory = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(
    private incomeCategoriesService: IncomeCategoriesService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  saveIncome() {
    console.log(this.formCategory.value);
  }
  getCategories() {
    this.incomeCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.incomeCategories = res.data.incomeCategories;
          console.log(this.incomeCategories);                    
        },
        (error) => console.log(error)
      );
  }
}
