import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { ExpenseCategoriesService } from 'src/app/services/categories/expense-categories.service';
@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.css'],
})
export class ExpenseCategoryComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  showButtonEdit: boolean = false;
  expenseCategories: Array<any> = [];
  currentCategory: any = {};
  currentCategoryId:string = '';
  formCategory = new FormGroup({
    title: new FormControl('', []),
    limit: new FormControl('', []),
  });

  constructor(
    private currentUserService: CurrentUserService,
    private expenseCategoriesService: ExpenseCategoriesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  saveIncome() {
    this.expenseCategoriesService
      .createCategory(
        this.currentUserService.getUserId(),
        this.formCategory.value
      )
      .subscribe(
        (res: any) => {
          this.getCategories();
          this.formCategory.reset();
        },
        (error) => console.log(error)
      );
  }
  getCategories() {
    this.expenseCategoriesService
      .getCategories(this.currentUserService.getUserId())
      .subscribe(
        (res: any) => {
          this.expenseCategories = res.data.expenseCategories;          
        },
        (error) => console.log(error)
      );
  }
  getCategory(idCategory: string) {
    this.expenseCategoriesService
      .getCategory(this.currentUserService.getUserId(), idCategory)
      .subscribe(
        (res: any) => {
          this.showButtonEdit = true;
          this.currentCategory = res.data;
          this.formCategory.patchValue({
            title: this.currentCategory.title,
            limit: this.currentCategory.limit,
          });
        },
        (error) => console.log(error)
      );
  }

  cancelEdit() {
    this.showButtonEdit = false;
    this.formCategory.reset();
  }

  updateCategory() {
    this.expenseCategoriesService
      .updateCategory(
        this.currentUserService.getUserId(),
        this.currentCategory._id,
        this.formCategory.value
      )
      .subscribe(
        (res: any) => {
          this.getCategories();
          this.cancelEdit();
        },
        (error) => console.log(error)
      );
  }
  openModalConfirm(modal: any, idCategory: string) {
    this.modalService.open(modal, { size: 'sm', centered: true });
    this.currentCategoryId = idCategory;
  }
  deleteCategory() {
    this.expenseCategoriesService
      .deleteCategory(
        this.currentUserService.getUserId(),
        this.currentCategoryId
      )
      .subscribe(
        (res: any) => {
          this.getCategories();
          this.currentCategoryId = '';
          this.modalService.dismissAll();
        },
        (error) => console.log(error)
      );
  }
}
