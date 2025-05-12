import { Component,inject,input, ViewEncapsulation } from '@angular/core';
import { DUMMY_CLIENTS } from '../../../main';

@Component({
  selector: 'app-testimonial-card',
  imports: [],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css',
  

})
export class TestimonialCardComponent {
  introText = input<string>('');
  name = input<string>('');
  job = input<string>('');
  img = input<string>('');
}
