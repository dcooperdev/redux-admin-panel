import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { ActivateLoadingAction, ActivateReadygAction } from './../shared/ui.actions';
import { AppState } from '../app.reducer';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model/user.model';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import * as UserModel from './model/user.model';
import { SetUserAction, UnsetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userFirebaseSubscription: Subscription = new Subscription();
  private user: User;

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener() {

    this.afAuth.authState.subscribe(
      (fbUser: firebase.User) => {
        if ( fbUser ) {
          this.userFirebaseSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
            .subscribe(
              (userObj: any) => {
                const newUser = new User( userObj );
                this.store.dispatch( new SetUserAction( newUser ) );
                this.user = newUser;
              }
            );
        } else {
          this.userFirebaseSubscription.unsubscribe();
        }
      }
    );

  }

  isAuthenticated() {
    return this.afAuth.authState
      .pipe(
        map( (fbUser: firebase.User) => {

          if ( fbUser === null ) {
            this.router.navigate(['/login']);
          }

          return fbUser !== null;
        })
      );
  }

  newUser( name: string, email: string, password: string ) {

    this.store.dispatch( new ActivateLoadingAction() );

    this.afAuth.auth
    .createUserWithEmailAndPassword( email, password )
    .then(
      (response: any) => {

        const user: UserModel.User = {
          uid: response.user.uid,
          name,
          email
        };

        this.afDB.doc(`${ user.uid }/usuario`)
          .set( user )
          .then( ( DBresponse: any ) => {

            console.log( DBresponse );
            this.router.navigate(['/dashboard']);
            this.store.dispatch( new ActivateReadygAction() );

          })
          .catch(
            (error: any) => {
              this.store.dispatch( new ActivateReadygAction() );
              Swal.fire( 'Error', error.message, 'error' );
            }
          );

      }
    )
    .catch(
      (error: any) => {
        Swal.fire( 'Error', error.message, 'error' );
      }
    );
  }

  login( email: string, password: string ) {

    this.store.dispatch( new ActivateLoadingAction() );

    this.afAuth.auth
    .signInWithEmailAndPassword( email, password )
    .then(
      (response: any) => {
        this.store.dispatch( new ActivateReadygAction() );
        this.router.navigate(['/dashboard']);
      }
    )
    .catch(
      (error: any) => {
        this.store.dispatch( new ActivateReadygAction() );
        Swal.fire( 'Error', error.message, 'error' );
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new UnsetUserAction() );
  }

  getUser() {
    return { ...this.user };
  }
}
