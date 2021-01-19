import {Component, OnInit  } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  optionModal:string = '' ;
  constructor(private modalService:NgbModal) {
  }
  ngOnInit(): void {    
  }

  openModal(modal:any, event:any):void{
    this.modalService.open(modal);
    if(event.target.outerText === 'Income'){
      this.optionModal = 'Income';
    }
    else if(event.target.outerText === 'Expense'){
      this.optionModal = 'Expense';
    }
    
  }
  
}
