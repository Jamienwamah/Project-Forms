import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Point directly to your actual landing page file location: src/app/landing/landing.ts
    loadComponent: () =>
      import('./landing/landing').then((m) => m.LandingComponent),
    title: 'IT Service Portal - Select Form',
  },
  {
    path: 'forms/device-troubleshooting',
    // Adjust path if this component is inside src/app/components/ instead of src/app/pages/
    loadComponent: () =>
      import('./components/device-troubleshooting/device-troubleshooting.component').then(
        (m) => m.DeviceTroubleshootingComponent
      ),
    title: 'Device Troubleshooting Request',
  },
  {
    path: 'forms/device-replacement',
    loadComponent: () =>
      import('./components/device-replacement/device-replacement.component').then(
        (m) => m.DeviceReplacementComponent
      ),
    title: 'Device Replacement Request',
  },
  {
    path: '**',
    redirectTo: '',
  },
];