import { Component, OnInit } from '@angular/core';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faCommentDollar,
} from '@fortawesome/free-solid-svg-icons';
import { IncomeService } from 'src/app/services/dashboard/income.service';
@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css'],
})
export class SummaryCardsComponent implements OnInit {
  //----------------icons------------------
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faCommentDollar = faCommentDollar;
  constructor(public incomeService: IncomeService) {}

  ngOnInit(): void {}
}
