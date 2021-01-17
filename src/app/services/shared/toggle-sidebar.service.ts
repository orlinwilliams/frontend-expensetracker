import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleSidebarService {
  openedSidebar: boolean = true;
  constructor() {}
}
