import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-your-data-section',
  imports: [],
  templateUrl: './your-data-section.component.html',
  styleUrl: './your-data-section.component.css'
})
export class YourDataSectionComponent {
  article = inject(ARTICLE);
}
