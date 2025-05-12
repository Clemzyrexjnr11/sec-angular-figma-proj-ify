import { Component,inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-extension-section',
  imports: [],
  templateUrl: './extension-section.component.html',
  styleUrl: './extension-section.component.css'
})
export class ExtensionSectionComponent {
   article = inject(ARTICLE)
}
