import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {
    path: '',
    loadChildren: './income/income.module#IncomeModule',
    canLoad: [ AuthGuard ]
  },
  { path: '**',       redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
