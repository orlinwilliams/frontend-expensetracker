import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeComponent } from '../dashboard/income/income.component';

import { CategoriesComponent } from './categories.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: '', component: HomeCategoryComponent },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
