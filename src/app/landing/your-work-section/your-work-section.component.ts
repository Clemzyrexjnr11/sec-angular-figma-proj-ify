import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-your-work-section',
  imports: [],
  templateUrl: './your-work-section.component.html',
  styleUrl: './your-work-section.component.css'
})
export class YourWorkSectionComponent {
 article = inject(ARTICLE);
}
