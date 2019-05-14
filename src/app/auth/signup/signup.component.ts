import { AppState } from './../../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { UiToolsService } from 'src/app/shared/ui-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public loading: boolean;

  constructor( private auth: AuthService,
               public store: Store<AppState>,
               private uiTools: UiToolsService ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select('ui')
          .subscribe(
            ( ui: any ) => {
              this.uiTools.makingAnAction( ui.isLoading, 'Creando usuario...' );
            }
          )
    );
  }

  onSubmit( data: any ) {
    this.auth.newUser( data.name, data.email, data.password );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }

}
