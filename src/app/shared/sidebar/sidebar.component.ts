import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  //Settings sidebar
  opened: boolean = true;
  modeNum: number = 0;
  modes: Array<any> = ['over', 'push', 'slide'];
  constructor() {}

  ngOnInit(): void {}
}
