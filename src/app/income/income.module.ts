import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeComponent } from './income.component';
import { StadisticComponent } from './stadistic/stadistic.component';
import { DetailComponent } from './detail/detail.component';
import { OrderIncomesPipe } from './order-incomes.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeReducer } from './income.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeComponent,
    StadisticComponent,
    DetailComponent,
    OrderIncomesPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature( 'income', incomeReducer )
  ],
  exports: [
    DashboardComponent,
    IncomeComponent,
    StadisticComponent,
    DetailComponent,
    OrderIncomesPipe
  ]
})
export class IncomeModule { }
