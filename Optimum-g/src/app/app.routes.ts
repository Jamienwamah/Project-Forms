import { Routes } from '@angular/router';

export const routes: Routes = [

  // ============================================================
  // LANDING PAGE
  // ============================================================

  {
    path: '',
    loadComponent: () =>
      import('./landing/landing').then(
        (m) => m.LandingComponent
      ),
    title: 'IT Service & Device Portal',
  },


  // ============================================================
  // OST FORMS
  // ============================================================

  {
    path: 'forms/OST/replacement',
    loadComponent: () =>
      import('./pages/forms/OST-Systems/replacement').then(
        (m) => m.OstReplacement
      ),
    title: 'OST - Device Replacement',
  },

  {
    path: 'forms/OST/troubleshooting',
    loadComponent: () =>
      import('./pages/forms/OST-Systems/troubleshooting').then(
        (m) => m.OstTroubleshoot
      ),
    title: 'OST - Device Troubleshooting',
  },

  {
    path: 'forms/OST/infrastructure',
    loadComponent: () =>
      import('./pages/forms/OST-Systems/infrastructure').then(
        (m) => m.ItInfrastructureReceiptFormComponent
      ),
    title: 'OST - Infrastructure Receipt',
  },


  // ============================================================
  // OGCM FORMS
  // ============================================================

  {
    path: 'forms/OGCM/replacement',
    loadComponent: () =>
      import('./pages/forms/OGCM/replacement').then(
        (m) => m.OGCMReplacement
      ),
    title: 'OGCM - Device Replacement',
  },

  {
    path: 'forms/OGCM/troubleshooting',
    loadComponent: () =>
      import('./pages/forms/OGCM/troubleshooting').then(
        (m) => m.OGCMTroubleshoot
      ),
    title: 'OGCM - Device Troubleshooting',
  },

  {
    path: 'forms/OGCM/infrastructure',
    loadComponent: () =>
      import('./pages/forms/OGCM/Infrastructure').then(
        (m) => m.OgcmInfrastructureReceiptFormComponent
      ),
    title: 'OGCM - Infrastructure Receipt',
  },


  // ============================================================
  // OGFS FORMS
  // ============================================================

  {
    path: 'forms/OGFS/replacement',
    loadComponent: () =>
      import('./pages/forms/OGFS/replacement').then(
        (m) => m.OGFSReplacement
      ),
    title: 'OGFS - Device Replacement',
  },

  {
    path: 'forms/OGFS/troubleshooting',
    loadComponent: () =>
      import('./pages/forms/OGFS/troubleshooting').then(
        (m) => m.OGFSTroubleshooting
      ),
    title: 'OGFS - Device Troubleshooting',
  },

  {
    path: 'forms/OGFS/infrastructure',
    loadComponent: () =>
      import('./pages/forms/OGFS/Infrastructure').then(
        (m) => m.OGFSInfrastructure
      ),
    title: 'OGFS - Infrastructure Receipt',
  },


  // ============================================================
  // FALLBACK
  // ============================================================

  {
    path: '**',
    redirectTo: '',
  },

];