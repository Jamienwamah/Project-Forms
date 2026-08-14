import { Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing';

export const appRoutes: Routes = [
  { 
    path: '', 
    component: LandingComponent
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