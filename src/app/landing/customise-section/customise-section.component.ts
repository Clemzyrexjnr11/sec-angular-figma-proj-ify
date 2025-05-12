import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-customise-section',
  imports: [],
  templateUrl: './customise-section.component.html',
  styleUrl: './customise-section.component.css'
})
export class CustomiseSectionComponent {
   article = inject(ARTICLE);
}
