import { Store } from '@ngrx/store';
import { IncomeService } from './income.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Income } from './model/income.model';

import Swal from 'sweetalert2';
import { AppState } from './income.reducer';
import { UiToolsService } from '../shared/ui-tools.service';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, ActivateReadygAction } from '../shared/ui.actions';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styles: []
})
export class IncomeComponent implements OnInit, OnDestroy {

  incomeForm: FormGroup;
  type = 'ingress';

  private subscriptions: Subscription[] = [];

  constructor( private income: IncomeService, private store: Store<AppState>, private uiTools: UiToolsService ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select('ui')
        .subscribe(
          ( ui: any ) => {
            this.uiTools.makingAnAction( ui.isLoading );
          }
        )
    );

    this.incomeForm = new FormGroup({
      description: new FormControl('', Validators.required),
      ammount: new FormControl(0, Validators.min(0))
    });
  }

  onSubmit() {

    this.store.dispatch( new ActivateLoadingAction() );

    const income = new Income({ ...this.incomeForm.value, type: this.type });

    this.income.newIncome( income )
      .then( () => {

        this.incomeForm.reset({ ammount: 0 });

        this.store.dispatch( new ActivateReadygAction() );

        this.uiTools.toast('success', `${ income.description } creado correctamente`, 2000 );

      });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }

}
