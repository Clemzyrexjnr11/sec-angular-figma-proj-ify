import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from './landing/hero-section/hero-section.component';
import { NavbarSectionComponent } from './landing/navbar-section/navbar-section.component';
import { ProjectSectionComponent } from "./landing/project-section/project-section.component";
import { ExtensionSectionComponent } from "./landing/extension-section/extension-section.component";
import { CustomiseSectionComponent } from "./landing/customise-section/customise-section.component";
import { PlanSectionComponent } from "./landing/plan-section/plan-section.component";
import { YourWorkSectionComponent } from "./landing/your-work-section/your-work-section.component";
import { YourDataSectionComponent } from "./landing/your-data-section/your-data-section.component";
import { SponsorsSectionComponent } from "./landing/sponsors-section/sponsors-section.component";
import { FavAppsSectionComponent } from "./landing/fav-apps-section/fav-apps-section.component";
import { TestimonialsSectionComponent } from "./landing/testimonials-section/testimonials-section.component";
import { TryWhiteSpaceSectionComponent } from "./landing/try-white-space-section/try-white-space-section.component";
import { FooterSectionComponent } from "./landing/footer-section/footer-section.component";

@Component({
  selector: 'app-root',
  imports: [NavbarSectionComponent, HeroSectionComponent, ProjectSectionComponent, ExtensionSectionComponent, CustomiseSectionComponent, PlanSectionComponent, YourWorkSectionComponent, YourDataSectionComponent, SponsorsSectionComponent, FavAppsSectionComponent, TestimonialsSectionComponent, TryWhiteSpaceSectionComponent, FooterSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
