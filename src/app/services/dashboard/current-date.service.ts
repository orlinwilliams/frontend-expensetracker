import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {
  currentDate$ = new EventEmitter<any>();
  constructor() { }
}
