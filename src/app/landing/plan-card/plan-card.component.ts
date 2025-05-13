import { Component, input, Input, Pipe, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-plan-card',
  imports: [],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css',
  encapsulation:ViewEncapsulation.None

})
export class PlanCardComponent {
  // readonly plans = input<{ 
  //   type: string;
  //   worth: string;
  //   planId: string;
  //   plandetail: string;
  //   planContent: string[];
  //   plan_link: string;
  //   plan_linkcontent: string
  // }>()
}
