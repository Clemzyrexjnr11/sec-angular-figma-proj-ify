import { Component, inject } from '@angular/core';
import { ARTICLE } from '../../../main';

@Component({
  selector: 'app-project-section',
  imports: [],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectSectionComponent {
  article = inject(ARTICLE)
}
