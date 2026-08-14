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
  { 
    path: 'device-replacement', 
    component: OGCMReplacement,
  },
  { 
    path: 'device-replacement', 
   component: OGFSReplacement,
  },
  { 
    path: 'device-replacement', 
    component: OstReplacement,
  },
  {
    path: 'device-replacement', 
    component: OGCMTroubleshoot,
  },
  { 
    path: 'device-replacement', 
    component: OGFSTroubleshooting,
  },
  { 
    path: 'device-replacement', 
    component: OstTroubleshoot,
  },
  { 
    path: 'device-replacement', 
    component: OgcmInfrastructureReceiptFormComponent,
  },
  { 
    path: 'device-replacement', 
    component: OGFSInfrastructure,
  },
  { 
    path: 'device-replacement', 
    component: ItInfrastructureReceiptFormComponent,
  },
];