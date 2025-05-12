import { Component, input, Input, Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-plan-card',
  imports: [CurrencyPipe],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css'
})
export class PlanCardComponent {
  readonly plans = input<{ 
    type: string;
    worth: string;
    planId: string;
    plandetail: string;
    planContent: string[];
    plan_link: string;
    plan_linkcontent: string
  }>()
}
