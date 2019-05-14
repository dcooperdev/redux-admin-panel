import { Income } from './model/income.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderIncomes'
})
export class OrderIncomesPipe implements PipeTransform {

  transform(items: Income[] ): Income[] {
    if ( typeof items !== 'undefined' ) {

      return items.sort(
        ( a, b ) => {
          if ( a.type === 'ingress') {
            return -1;
          } else {
            return 1;
          }
        }
      );

    }
  }

}
