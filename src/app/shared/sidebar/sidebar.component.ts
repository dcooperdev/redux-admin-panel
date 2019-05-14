import { AppState } from './../../app.reducer';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/model/user.model';
import { filter } from 'rxjs/operators';
import { IncomeService } from 'src/app/income/income.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user: User;

  constructor( private auth: AuthService,
               private store: Store<AppState>,
               private income: IncomeService ) { }

  ngOnInit() {
    this.store.select('auth')
        .pipe(
          filter( auth => auth.user !== null )
        )
        .subscribe(
          auth => {
            this.user = auth.user ;
          }
        )
  }

  logout() {
    this.auth.logout();
    this.income.unsuscribe();
  }

}
