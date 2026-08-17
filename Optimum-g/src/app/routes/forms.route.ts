import { Routes } from '@angular/router';
import { OGCMReplacement } from '../pages/forms/OGCM/replacement';
import { OGFSReplacement } from '../pages/forms/OGFS/replacement';
import { OstReplacement } from '../pages/forms/OST-Systems/replacement';
import { OGCMTroubleshoot } from '../pages/forms/OGCM/troubleshooting';
import { OGFSTroubleshooting } from '../pages/forms/OGFS/troubleshooting';
import { OstTroubleshoot } from '../pages/forms/OST-Systems/troubleshooting';
import { OgcmInfrastructureReceiptFormComponent } from '../pages/forms/OGCM/Infrastructure';
import { OGFSInfrastructure } from '../pages/forms/OGFS/Infrastructure';
import { ItInfrastructureReceiptFormComponent } from '../pages/forms/OST-Systems/infrastructure';

export const FORM_ROUTES: Routes = [
  // OGCM
  { path: 'OGCM/replacement', component: OGCMReplacement },
  { path: 'OGCM/troubleshooting', component: OGCMTroubleshoot },
  { path: 'OGCM/infrastructure', component: OgcmInfrastructureReceiptFormComponent },

  // OGFS
  { path: 'OGFS/replacement', component: OGFSReplacement },
  { path: 'OGFS/troubleshooting', component: OGFSTroubleshooting },
  { path: 'OGFS/infrastructure', component: OGFSInfrastructure },

  // OST
  { path: 'OST/replacement', component: OstReplacement },
  { path: 'OST/troubleshooting', component: OstTroubleshoot },
  { path: 'OST/infrastructure', component: ItInfrastructureReceiptFormComponent },

  // Lowercase aliases for manually typed URLs.
  { path: 'ogcm/replacement', redirectTo: 'OGCM/replacement', pathMatch: 'full' },
  { path: 'ogcm/troubleshooting', redirectTo: 'OGCM/troubleshooting', pathMatch: 'full' },
  { path: 'ogcm/infrastructure', redirectTo: 'OGCM/infrastructure', pathMatch: 'full' },
  { path: 'ogfs/replacement', redirectTo: 'OGFS/replacement', pathMatch: 'full' },
  { path: 'ogfs/troubleshooting', redirectTo: 'OGFS/troubleshooting', pathMatch: 'full' },
  { path: 'ogfs/infrastructure', redirectTo: 'OGFS/infrastructure', pathMatch: 'full' },
  { path: 'ost/replacement', redirectTo: 'OST/replacement', pathMatch: 'full' },
  { path: 'ost/troubleshooting', redirectTo: 'OST/troubleshooting', pathMatch: 'full' },
  { path: 'ost/infrastructure', redirectTo: 'OST/infrastructure', pathMatch: 'full' },
];

// import { Routes } from '@angular/router';

// declare global {
//   interface ImportMeta {
//     glob: (pattern: string) => Record<string, () => Promise<Record<string, any>>>;
//   }
// }

// // 1. Glob all form TS files dynamically from the forms directory
// const formModules = import.meta.glob('../pages/forms/**/*.ts');

// // 2. Map standard file names to clean route segments
// const ROUTE_NAME_MAP: Record<string, string> = {
//   'infrastructure': 'infrastructure',
//   'replacement': 'replacement',
//   'troubleshooting': 'troubleshooting'
// };

// export const FORM_ROUTES: Routes = Object.keys(formModules).map((filePath) => {
//   // Extract org/category and form type from path: ../pages/forms/[ORG]/[FORM_TYPE].ts
//   // Example path: "../pages/forms/OGCM/Infrastructure.ts" -> ["OGCM", "Infrastructure"]
//   const pathParts = filePath.split('/forms/')[1].replace(/\.ts$/, '').split('/');
  
//   const org = pathParts[0].toLowerCase(); // e.g., 'ogcm', 'ogfs', 'ost-systems'
//   const fileKey = pathParts[1]?.toLowerCase(); // e.g., 'infrastructure', 'replacement', 'troubleshooting'
  
//   // Normalize folder names like OST-Systems to ost
//   const orgSegment = org === 'ost-systems' ? 'ost' : org;
//   const formSegment = ROUTE_NAME_MAP[fileKey] || fileKey;

//   return {
//     path: `${orgSegment}/${formSegment}`,
//     loadComponent: async () => {
//       // Dynamic import load
//       const module = await formModules[filePath]() as Record<string, any>;
      
//       // Automatically detect and return the exported Angular Component
//       const ComponentExport = Object.values(module).find(
//         (exp) => typeof exp === 'function' && exp.ɵcmp
//       );

//       if (!ComponentExport) {
//         throw new Error(`No Angular component export found in file: ${filePath}`);
//       }

//       return ComponentExport;
//     }
//   };
// });
