import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productReducer } from './product.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductsListComponent } from './new/products-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListListComponent } from './products-list-list/products-list-list.component';

export const routes: Routes = [
  { path: 'new', component: ProductsListComponent },
  { path: 'list', component: ProductsListListComponent },
  { path: '**',       redirectTo: 'list' }
];

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsListListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild( routes ),
    StoreModule.forFeature( 'product', productReducer )
  ],
  exports: [
    ProductsListComponent,
    ProductsListListComponent
  ]
})
export class ProductsListModule { }
