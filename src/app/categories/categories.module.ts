import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { CategoriesComponent } from './categories.component';

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
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CategoriesModule {}
