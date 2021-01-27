import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {
  currentDate$ = new EventEmitter<any>();

  constructor() { }
  getDate(): object {
    const date = new Date();
    const dateJson = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    return dateJson;
  }
}
