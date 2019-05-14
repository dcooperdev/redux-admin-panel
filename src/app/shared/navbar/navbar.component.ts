import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/model/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor( private store: Store<AppState> ) { }

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

}
