import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private auth: AuthService ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthenticated();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated()
               .pipe(
                 take(1)
               );
  }

}
