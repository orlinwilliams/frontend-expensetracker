import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { CurrentDateService } from 'src/app/services/dashboard/current-date.service';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css'],
})
export class MonthCalendarComponent implements OnInit, AfterViewInit {
  currentYearMonth: string = '';

  constructor(private currentDateService: CurrentDateService) {}

  ngOnInit(): void {
    this.setCurrentDateToCalendar();
    
  }
  ngAfterViewInit(){
    this.setCurrentDate();
  }
  changeDate(event: any) {
    this.currentDateService.currentDate$.emit(
      this.formatDateObject(event.target.value)
    );
    
  }
  setCurrentDateToCalendar(): void {
    const date = new Date();
    this.currentYearMonth = `${date.getFullYear()}-${this.formatMonthToCalendar(
      date.getMonth()
    )}`;
  }
  setCurrentDate() {
    this.currentDateService.currentDate$.emit(
      this.formatDateObject(this.currentYearMonth)
    );
  }

  formatDateObject(date: string): object {
    const arrayDate = date.split('-');
    return { month: parseInt(arrayDate[1]), year: parseInt(arrayDate[0]) };
  }

  formatMonthToCalendar(month: number): string {
    if (month < 10) {
      return `0${month + 1}`;
    }
    return `${month + 1}`;
  }
}
