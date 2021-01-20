import { Component, HostListener, OnInit,  } from '@angular/core';
import { ToggleSidebarService } from 'src/app/services/shared/toggle-sidebar.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faChevronRight = faChevronRight;
  modeNum: number = 1;
  modes: Array<any> = ['over', 'push', 'slide'];
  showOptionsCategories = false;
  constructor(public toggleSidebarService: ToggleSidebarService ) {}

  ngOnInit(): void {
    this.detectWindowWidth();  
  }

  detectWindowWidth():void{
    if (window.innerWidth <= 900) {
      this.modeNum = 0;
    }
  }
  
  //------Event to change mode of sidebar-----
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    //console.log('Width: ' + event.target.innerWidth);
    if (event.target.innerWidth < 900) {
      this.modeNum = 0;
    } else {
      this.modeNum = 1;
    }
  }
  openOptionsCategories(){
    this.showOptionsCategories = !this.showOptionsCategories
  }
}
