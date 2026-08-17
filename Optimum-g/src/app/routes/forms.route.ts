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
  { path: 'ogcm/replacement', component: OGCMReplacement },
  { path: 'ogcm/troubleshooting', component: OGCMTroubleshoot },
  { path: 'ogcm/infrastructure', component: OgcmInfrastructureReceiptFormComponent },

  // OGFS
  { path: 'ogfs/replacement', component: OGFSReplacement },
  { path: 'ogfs/troubleshooting', component: OGFSTroubleshooting },
  { path: 'ogfs/infrastructure', component: OGFSInfrastructure },

  // OST
  { path: 'ost/replacement', component: OstReplacement },
  { path: 'ost/troubleshooting', component: OstTroubleshoot },
  { path: 'ost/infrastructure', component: ItInfrastructureReceiptFormComponent },
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