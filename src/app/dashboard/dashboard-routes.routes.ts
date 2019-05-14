import { Routes } from '@angular/router';
import { IncomeComponent } from './../income/income.component';
import { StadisticComponent } from '../income/stadistic/stadistic.component';
import { DetailComponent } from '../income/detail/detail.component';


export const dashboardRoutes: Routes = [

  { path: '', component: StadisticComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'products', loadChildren: '../products-list/products-list.module#ProductsListModule' },

];

