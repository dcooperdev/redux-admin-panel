import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { filter } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { ProductListService } from '../products-list.service';

import Swal from 'sweetalert2';
import { UiToolsService } from 'src/app/shared/ui-tools.service';

@Component({
  selector: 'app-products-list-list',
  templateUrl: './products-list-list.component.html',
  styleUrls: ['./products-list-list.component.sass']
})
export class ProductsListListComponent implements OnInit {

  public products: Product[] = [];

  constructor( private product: ProductListService, private store: Store<AppState>, private uiTools: UiToolsService ) { }

  ngOnInit() {
    this.product.initProductListener();
    this.store.select('product')
        .pipe(
          filter( products => products !== null )
        )
        .subscribe(
          (products: any) => {
            this.products = products.items;
          }
        );
  }

  delete( product: Product ) {

    Swal.fire({
      title: `Desea eliminar ${ product.name }?`,
      text: 'Este cambio no se puede revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, eliminar ${ product.name }!`,
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.product.deleteProduct( product.uid )
          .then( response => {

            this.uiTools.toast('success', `${ product.name } ha sido eliminado`, 2000 );

          });
      }
    });
  }

}
