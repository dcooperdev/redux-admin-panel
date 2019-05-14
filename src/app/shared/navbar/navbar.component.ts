import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/model/user.model';
import { filter } from 'rxjs/operators';
import { UiToolsService } from '../ui-tools.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor( private store: Store<AppState>, public uiTools: UiToolsService ) { }

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
