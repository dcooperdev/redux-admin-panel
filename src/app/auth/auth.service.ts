import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from 'firebase';
import * as UserModel from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore ) { }

  initAuthListener() {

    this.afAuth.authState.subscribe(
      (fbUser: User) => {
        console.log( fbUser );
      }
    );

  }

  isAuthenticated() {
    return this.afAuth.authState
      .pipe(
        map( (fbUser: User) => {

          if ( fbUser === null ) {
            this.router.navigate(['/login']);
          }

          return fbUser !== null;
        })
      );
  }

  newUser( name: string, email: string, password: string ) {
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

          })
          .catch(
            (error: any) => {
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
    this.afAuth.auth
    .signInWithEmailAndPassword( email, password )
    .then(
      (response: any) => {
        this.router.navigate(['/dashboard']);
      }
    )
    .catch(
      (error: any) => {
        Swal.fire( 'Error', error.message, 'error' );
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
