import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UiToolsService } from 'src/app/shared/ui-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(  private auth: AuthService,
                public store: Store<AppState>,
                private uiTools: UiToolsService  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('ui')
        .subscribe(
          ( ui: any ) => {
            this.uiTools.makingAnAction( ui.isLoading, 'Autentificando usuario...' );
          }
        )
    );
  }

  onSubmit( data: any ) {
    console.log( data );
    this.auth.login( data.email, data.password );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }

}
