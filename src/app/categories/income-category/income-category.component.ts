import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  showButtonEdit: boolean = false;
  showTable: boolean = false;
  incomeCategories: Array<any> = [];
  currentCategory: any = {};
  currentCategoryId: string = '';
  formCategory = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor(
    private incomeCategoriesService: IncomeCategoriesService,
    private currentUserService: CurrentUserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  saveIncome() {
    this.incomeCategoriesService
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
  getCategory(idCategory: string) {
    this.incomeCategoriesService
      .getCategory(this.currentUserService.getUserId(), idCategory)
      .subscribe(
        (res: any) => {
          this.showButtonEdit = true;
          this.currentCategory = res.data;
          console.log(this.currentCategory);
          this.formCategory.patchValue({ title: this.currentCategory.title });
        },
        (error) => console.log(error)
      );
  }
  cancelEdit() {
    this.showButtonEdit = false;
    this.formCategory.reset();
  }
  updateCategory() {
    this.incomeCategoriesService
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
    this.incomeCategoriesService
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
