import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AuthModule } from './auth/auth.module';

// routes
import { AppRoutingModule } from './app-routing.module';

// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Modules
    AppRoutingModule,
    AuthModule,
    // IncomeModule,
    // -------
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
