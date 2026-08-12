import { Routes } from '@angular/router';
import { LandingPageComponent } from '../landing/landing';

export const appRoutes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent 
  },
  { 
    path: 'forms',
    // Lazy load the form routes module
    loadChildren: () => import('./forms.route').then(m => m.FORM_ROUTES)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];