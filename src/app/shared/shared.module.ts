//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    FontAwesomeModule,
    SidebarModule.forRoot(),
  ],
  exports:[HeaderComponent, SidebarComponent]
})
export class SharedModule { }
