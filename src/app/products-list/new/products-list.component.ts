import { UiToolsService } from '../../shared/ui-tools.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivateLoadingAction, ActivateReadygAction } from 'src/app/shared/ui.actions';
import { Product } from './../model/product.model';
import { AppState } from '../../app.reducer';
import { ProductListService } from './../products-list.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit {

  product: FormGroup;

  constructor( private store: Store<AppState>,
               private productservice: ProductListService,
               private uiTools: UiToolsService) { }

  ngOnInit() {
    this.product = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      observations: new FormControl(''),
      size: new FormControl(''),
      ammount: new FormControl('', Validators.min(0)),
      stock: new FormControl('', Validators.min(0))
    });
  }

  onSubmit() {

    this.store.dispatch( new ActivateLoadingAction() );

    const product = new Product({ ...this.product.value });

    this.productservice.newProduct( product )
      .then( () => {

        this.product.reset({ ammount: 0 });

        this.store.dispatch( new ActivateReadygAction() );

        this.uiTools.toast('success', `${ product.name } creado correctamente`, 2000 );

      });
  }

}
