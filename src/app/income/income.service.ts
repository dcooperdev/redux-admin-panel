import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Income } from './model/income.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { filter, map, subscribeOn } from 'rxjs/operators';
import { SetItemAction, UnsetItemAction } from './income.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private subscriptions: Subscription[] = [];

  constructor( private afDB: AngularFirestore,
               private auth: AuthService,
               private store: Store<AppState> ) { }

  initIncomeListener() {

    this.subscriptions.push(
      this.store.select('auth')
          .pipe(
            filter( auth => auth.user !== null )
          )
          .subscribe( auth => {
            this.IncomeItems( auth.user.uid );
          })
    );
  }

  private IncomeItems( uid: string ) {
    this.subscriptions.push(
      this.afDB.collection(`${ uid }/income/items`)
        .snapshotChanges()
          .pipe(
            map( docData => {

              return docData.map( doc => {
                return {
                  uid: doc.payload.doc.id,
                  ...doc.payload.doc.data()
                };
              });
            })
          )
          .subscribe(
            (collection: any) => {

              this.store.dispatch( new SetItemAction( collection ) );

            }
          )
    );
  }

  newIncome( income: Income ) {

    const user = this.auth.getUser();

    return this.afDB.doc(`${ user.uid }/income`)
               .collection('items').add({ ...income });

  }

  deleteIncome( uid: string ) {

    const user = this.auth.getUser();

    return this.afDB.doc(`${ user.uid }/income/items/${ uid }`)
               .delete();
  }

  unsuscribe() {
    this.subscriptions.forEach( (subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.store.dispatch( new UnsetItemAction() );
  }
}
