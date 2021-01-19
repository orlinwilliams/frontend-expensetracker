import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'date', 'category', 'value'];
  DATA = [
    { position: 1, date: 'Hydrogen', category: 1.0079, value: 'H' },
    { position: 2, date: 'Hydrogen', category: 2.025, value: 'M' },
    
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
