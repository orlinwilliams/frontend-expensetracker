import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'date', 'category', 'value'];
  DATA = [
    { position: 1, date: 'Hydrogen', category: 1.0079, value: 'H' },
    
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
