import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
   article = inject(ARTICLE);
}
