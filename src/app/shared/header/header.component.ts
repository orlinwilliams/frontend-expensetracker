import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ToggleSidebarService } from 'src/app/services/shared/toggle-sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private toggleSidebarService: ToggleSidebarService,
    public currentUserService: CurrentUserService,
    private loginService: LoginService,
    private router:Router
  ) {}

  ngOnInit(): void {}
  onToggleSidebar(): void {
    this.toggleSidebarService.openedSidebar = !this.toggleSidebarService
      .openedSidebar;
  }
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/authentication');
  }
}
