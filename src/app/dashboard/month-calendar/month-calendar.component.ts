import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css']
})
export class MonthCalendarComponent implements OnInit {

  currentYearMonth: string = '';

  constructor() {}

  ngOnInit(): void {
    this.currentDate();
  }

  changeDate(event: any) {
    console.log(event.target.value);
    console.log(typeof event.target.value);
  }
  currentDate(): void {
    const date = new Date();
    this.currentYearMonth = `${date.getFullYear()}-${this.formatMonth(
      date.getMonth()
    )}`;
  }

  formatMonth(month: number): string {
    if (month < 10) {
      return `0${month + 1}`;
    }
    return `${month + 1}`;
  }

}
