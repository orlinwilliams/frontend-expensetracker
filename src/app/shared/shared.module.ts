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
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, NotFoundComponent, ToastComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    FontAwesomeModule,
    SidebarModule.forRoot(),
  ],
  exports:[HeaderComponent, SidebarComponent,ToastComponent]
})
export class SharedModule { }
