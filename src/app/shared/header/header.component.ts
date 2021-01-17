import { Component, OnInit } from '@angular/core';
import { ToggleSidebarService } from 'src/app/services/shared/toggle-sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private toggleSidebarService: ToggleSidebarService) {}

  ngOnInit(): void {}
  onToggleSidebar(): void {
    this.toggleSidebarService.openedSidebar = !this.toggleSidebarService.openedSidebar;
  }
}
