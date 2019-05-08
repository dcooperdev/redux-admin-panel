import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router) { }

  newUser( name: string, email: string, password: string ) {
    this.afAuth.auth
    .createUserWithEmailAndPassword( email, password )
    .then(
      (response: any) => {
        console.log( response );
        this.router.navigate(['/dashboard']);
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
        console.log( response );
        this.router.navigate(['/dashboard']);
      }
    )
    .catch(
      (error: any) => {
        Swal.fire( 'Error', error.message, 'error' );
      }
    );
  }
}
