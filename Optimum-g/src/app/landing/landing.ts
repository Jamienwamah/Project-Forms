import {
  Component,
  ElementRef,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface EntityOption {
  label: string;
  code: 'OST' | 'OGCM' | 'OGFS';
}


interface FormCard {
  id: 'replacement' | 'troubleshooting' | 'infrastructure';
  title: string;
  description: string;
  category: string;
  iconBg: string;
  iconPath: string;
}


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
})
export class LandingComponent {

  activeDropdownId: string | null = null;


  // ============================================================
  // COMPANIES
  // ============================================================

  companyOptions: EntityOption[] = [

    {
      label: 'OST-Systems',
      code: 'OST',
    },

    {
      label: 'Optimum Global Capital Management',
      code: 'OGCM',
    },

    {
      label: 'Optimum Financial Services Ltd',
      code: 'OGFS',
    },

  ];


  // ============================================================
  // FORMS
  // ============================================================

  availableForms: FormCard[] = [

    {
      id: 'troubleshooting',

      title: 'Device Troubleshooting',

      description:
        'Report hardware crashes, OS errors, network connectivity issues, or malware alerts.',

      category: 'Hardware & OS Support',

      iconBg: 'bg-blue-50',

      iconPath:
        'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },


    {
      id: 'replacement',

      title: 'Device Replacement',

      description:
        'Request a swap for damaged hardware, end-of-life laptops, or upgraded mobile devices.',

      category: 'Asset Management',

      iconBg: 'bg-blue-50',

      iconPath:
        'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },


    {
      id: 'infrastructure',

      title: 'IT Infrastructure Receipt',

      description:
        'Record and register new server equipment, network switches, firewalls, and hardware assets.',

      category: 'Infrastructure',

      iconBg: 'bg-blue-50',

      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },

  ];


  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}


  // ============================================================
  // DROPDOWN
  // ============================================================

  toggleDropdown(
    formId: string,
    event: MouseEvent
  ): void {

    event.stopPropagation();

    this.activeDropdownId =
      this.activeDropdownId === formId
        ? null
        : formId;
  }


  // ============================================================
  // NAVIGATION
  // ============================================================

  selectCompanyAndNavigate(
    form: FormCard,
    companyCode: string
  ): void {
    this.activeDropdownId = null;

    const validCodes = ['OST', 'OGCM', 'OGFS'];

    if (validCodes.includes(companyCode.toUpperCase())) {
      const code = companyCode.toUpperCase();

      this.router.navigate(['/forms', code, form.id]);
      return;
    }

    console.error('No route found for:', form.id, companyCode);
  }
}
