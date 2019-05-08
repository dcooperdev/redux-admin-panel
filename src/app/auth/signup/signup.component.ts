import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  constructor( private auth: AuthService ) { }

  ngOnInit() {
  }

  onSubmit( data: any ) {
    console.log( data );
    this.auth.newUser( data.name, data.email, data.password );
  }

}
