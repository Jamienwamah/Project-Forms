import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.LandingComponent),
    title: 'IT Service Portal - Select Form',
  },
  {
    path: 'forms/device-troubleshooting',
    loadComponent: () =>
      import('./pages/forms/device-troubleshooting/device-troubleshooting.component').then(
        (m) => m.DeviceTroubleshootingComponent
      ),
    title: 'Device Troubleshooting Request',
  },
  {
    path: 'forms/device-replacement',
    loadComponent: () =>
      import('./pages/forms/device-replacement/device-replacement.component').then(
        (m) => m.DeviceReplacementComponent
      ),
    title: 'Device Replacement Request',
  },
  {
    path: '**',
    redirectTo: '',
  },
];