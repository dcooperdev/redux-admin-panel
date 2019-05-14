import { IncomeService } from './../income.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../income.reducer';
import { Income } from '../model/income.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';
import { UiToolsService } from 'src/app/shared/ui-tools.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  public items: Income[];

  private subscriptions: Subscription[] = [];

  constructor( private store: Store<AppState>, private income: IncomeService, private uiTools: UiToolsService ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('income')
          .pipe(
            filter( response => response.items.length > 0 )
          )
          .subscribe(
            response => {
              this.items = response.items;
            }
          )
    );
  }

  delete( item: Income ) {

    Swal.fire({
      title: `Desea eliminar ${ item.description }?`,
      text: 'Este cambio no se puede revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, eliminar ${ item.description }!`,
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.income.deleteIncome( item.uid )
          .then( response => {

            this.uiTools.toast('success', `${ item.description } ha sido eliminado`, 2000 );

          });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach( (subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }


}
