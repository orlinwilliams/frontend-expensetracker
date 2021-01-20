import { Component, OnInit } from '@angular/core';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-income-category',
  templateUrl: './income-category.component.html',
  styleUrls: ['./income-category.component.css']
})
export class IncomeCategoryComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  constructor() { }

  ngOnInit(): void {
  }

}
