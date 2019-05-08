import { IncomeComponent } from './../income/income.component';
import { Routes } from '@angular/router';
import { StadisticComponent } from '../income/stadistic/stadistic.component';
import { DetailComponent } from '../income/detail/detail.component';


export const dashboardRoutes: Routes = [

  { path: '', component: StadisticComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'detail', component: DetailComponent }

];

