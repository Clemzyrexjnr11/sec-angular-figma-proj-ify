import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PlanCardComponent } from "../plan-card/plan-card.component";
import { DUMMY_PLANS } from '../../../main';

@Component({
  selector: 'app-plan-section',
  imports: [PlanCardComponent],
  templateUrl: './plan-section.component.html',
  styleUrl: './plan-section.component.css',
})
export class PlanSectionComponent {
   plans = inject(DUMMY_PLANS);
}
