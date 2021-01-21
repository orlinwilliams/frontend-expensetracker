import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-income-category',
  templateUrl: './income-category.component.html',
  styleUrls: ['./income-category.component.css'],
})
export class IncomeCategoryComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  showButtonIncome: boolean = false;
  formCategory = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  constructor() {}

  ngOnInit(): void {}
  saveIncome(){
    console.log(this.formCategory.value);
  }
}
