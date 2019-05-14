import { IncomeService } from './../income/income.service';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../products-list/products-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( private incomeService: IncomeService ) { }

  ngOnInit() {
    this.incomeService.initIncomeListener();
  }

}
