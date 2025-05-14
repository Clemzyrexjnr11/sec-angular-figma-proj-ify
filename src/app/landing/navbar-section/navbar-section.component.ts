import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-section',
  imports: [],
  templateUrl: './navbar-section.component.html',
  styleUrl: './navbar-section.component.css'
})
export class NavbarSectionComponent {
  onAddMenu(){
   document.querySelector('.aside_nav')?.classList.add('addmenu');
  }
  onRemoveMenu(){
    document.querySelector('.aside_nav')?.classList.remove('addmenu');

  }
}
