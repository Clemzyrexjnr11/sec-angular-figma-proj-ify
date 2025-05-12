import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-fav-apps-section',
  imports: [],
  templateUrl: './fav-apps-section.component.html',
  styleUrl: './fav-apps-section.component.css'
})
export class FavAppsSectionComponent {
  article = inject(ARTICLE);
}
