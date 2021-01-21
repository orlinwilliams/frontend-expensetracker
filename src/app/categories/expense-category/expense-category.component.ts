import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.css']
})
export class ExpenseCategoryComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  showButtonEdit:boolean = false;
  formCategory = new FormGroup({
    title: new FormControl('',[]),
    limit: new FormControl('',[]),
  })

  constructor() { }

  ngOnInit(): void {
  }
  

}
