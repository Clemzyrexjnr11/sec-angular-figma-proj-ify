import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { article } from './app/services/articles';
import { InjectionToken } from '@angular/core';
import { testimonialClients } from './app/services/testimonial-clients';
import { planDetails } from './app/services/plan-content';
import { Article } from './app/models/articleModel';
import { Client } from './app/models/testimonialModel';
import { planmodel } from './app/models/planModel';


export const ARTICLE = new InjectionToken<Article[]>('article');
export const DUMMY_CLIENTS = new InjectionToken<Client[]>('dummy_clients');
export const DUMMY_PLANS = new InjectionToken<planmodel[]>('dummyPlans');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ARTICLE, useValue: article },
    { provide: DUMMY_CLIENTS, useValue: testimonialClients },
    { provide: DUMMY_PLANS, useValue: planDetails },
  ],
}).catch((err) => console.error(err));
