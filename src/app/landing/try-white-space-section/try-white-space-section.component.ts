import { Component, inject} from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-try-white-space-section',
  imports: [],
  templateUrl: './try-white-space-section.component.html',
  styleUrl: './try-white-space-section.component.css'
})
export class TryWhiteSpaceSectionComponent {
  article = inject(ARTICLE);
}
