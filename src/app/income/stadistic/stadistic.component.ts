import { Income } from './../model/income.model';
import { AppState } from '../income.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styles: []
})
export class StadisticComponent implements OnInit {

  ingress: number;
  egress: number;

  ingressCount: number;
  egressCount: number;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('income')
        .subscribe(
          ( IncomeList ) => {
            this.incomeCounter( IncomeList.items );
          }
        )
  }

  incomeCounter( items: Income[] ) {

    this.ingress = 0;
    this.egress = 0;

    this.ingressCount = 0;
    this.egressCount = 0;

    items.forEach( item => {

      if ( item.type === 'ingress' ) {
        this.ingressCount++;
        this.ingress += item.ammount;
      } else {
        this.egressCount++;
        this.egress += item.ammount;
      }

    });

    this.doughnutChartData = [ +this.ingress, +this.egress ];
  }

}
