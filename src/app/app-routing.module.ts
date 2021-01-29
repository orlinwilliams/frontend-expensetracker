import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateTokenGuard } from './authentication/validate-token.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate:[ValidateTokenGuard]
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
      canActivate:[ValidateTokenGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
      canActivate:[ValidateTokenGuard]
  },
  {
    path:'not-found', component:NotFoundComponent 
  },
  {
    path:'**', redirectTo:'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
