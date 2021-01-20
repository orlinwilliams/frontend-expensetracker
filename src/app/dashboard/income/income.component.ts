import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['date', 'category', 'value', 'actions'];
  DATA = [
    { date: 'Cloro', category: 1.0079, value: 'H' },
    { date: 'Oxigen', category: 3.025, value: 'M' },
    { date: 'Hydrogen', category: 2.025, value: 'M' },
  ];
  dataSource = new MatTableDataSource(this.DATA);
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  constructor() {
  }
  ngOnInit(): void {    
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}