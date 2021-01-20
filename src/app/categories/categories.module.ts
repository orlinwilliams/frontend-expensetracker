import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from '../shared/shared.module';

import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeCategoryComponent } from './home-category/home-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ExpenseCategoryComponent,
    IncomeCategoryComponent,
    HomeCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgbModule,
  ],
})
export class CategoriesModule {}
