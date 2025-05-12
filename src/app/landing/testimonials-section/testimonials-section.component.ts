import { Component,inject,input, ViewEncapsulation } from '@angular/core';
import { TestimonialCardComponent } from "../testimonial-card/testimonial-card.component";
import { DUMMY_CLIENTS } from '../../../main';

@Component({
  selector: 'app-testimonials-section',
  imports: [TestimonialCardComponent],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css',
})
export class TestimonialsSectionComponent {
   dummyClients = inject(DUMMY_CLIENTS);
  
}
