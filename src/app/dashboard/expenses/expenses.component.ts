import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['date', 'category', 'value', 'actions'];
  DATA = [
    { date: '21/1/2020', category: 1.0079, value: {title: 'Hla'} },
    { date: '01/1/2021', category: 3.025, value: {title: 'Para'} },
    { date: '17/5/2019', category: 2.025, value: {title: 'Loco'} },
  ];
  dataSource = new MatTableDataSource(this.DATA);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
    
  }
  
  getPropertyByPath(obj: Object, pathString: string){
    return pathString.split('.').reduce((o:any, i:any) => o[i], obj);
  }
}
