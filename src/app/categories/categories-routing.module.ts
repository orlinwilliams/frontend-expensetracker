import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeComponent } from '../dashboard/income/income.component';

import { CategoriesComponent } from './categories.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: '', component: ExpenseCategoryComponent },
      { path: 'expense', component: ExpenseCategoryComponent },
      { path: 'income', component: IncomeCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
