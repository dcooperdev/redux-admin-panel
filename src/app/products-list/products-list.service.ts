import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetProductAction, UnsetProductAction } from './product.action';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private subscriptions: Subscription[] = [];

  constructor( private afDB: AngularFirestore,
               private auth: AuthService,
               private store: Store<AppState> ) { }

  initProductListener() {

    this.subscriptions.push(
      this.store.select('auth')
          .pipe(
            filter( auth => auth.user !== null )
          )
          .subscribe( auth => {
            this.IncomeProductItems( auth.user.uid );
          })
    );
  }

  private IncomeProductItems( uid: string ) {
    this.subscriptions.push(
      this.afDB.collection(`${ uid }/products/items`)
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

              this.store.dispatch( new SetProductAction( collection ) );

            }
          )
    );
  }

  newProduct( product: Product ) {

    const user = this.auth.getUser();

    return this.afDB.doc(`${ user.uid }/products`)
               .collection('items').add({ ...product });

  }

  deleteProduct( uid: string ) {

    const user = this.auth.getUser();

    return this.afDB.doc(`${ user.uid }/products/items/${ uid }`)
               .delete();
  }

  unsuscribe() {
    this.subscriptions.forEach( (subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.store.dispatch( new UnsetProductAction() );
  }
}
