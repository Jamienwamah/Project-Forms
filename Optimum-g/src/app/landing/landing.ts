import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface EntityOption {
  label: string;
  code: string;
}

interface FormCard {
  id: string;
  title: string;
  description: string;
  category: string;
  route: string;
  iconBg: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">IT Service & Device Portal</h1>
          <p class="mt-3 text-lg text-slate-600">Select an organization below to launch the respective request form.</p>
        </div>

        <!-- Form Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            *ngFor="let form of availableForms"
            class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {{ form.category }}
                </span>
              </div>
              <h2 class="text-xl font-bold text-slate-900">{{ form.title }}</h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">{{ form.description }}</p>
            </div>

            <!-- Unified Dropdown Button (Hover & Click) -->
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <div class="relative inline-block text-left group w-full sm:w-auto">
                <button
                  type="button"
                  (click)="toggleDropdown(form.id)"
                  class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Select Entity
                  <svg class="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                  class="absolute right-0 bottom-full mb-2 w-64 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-20 transition-all duration-150 hidden group-hover:block"
                  [class.hidden]="activeDropdownId !== form.id"
                >
                  <div class="p-2 space-y-1">
                    <span class="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Select Company / Subsidiary
                    </span>
                    <button
                      *ngFor="let company of companyOptions"
                      (click)="selectCompanyAndNavigate(form.route, company.code)"
                      class="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{{ company.label }}</span>
                      <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
})
export class LandingComponent {
  activeDropdownId: string | null = null;

  companyOptions: EntityOption[] = [
    { label: 'OST-Systems', code: 'ost-systems' },
    { label: 'Optimum Global Capital Management', code: 'optimum-capital' },
    { label: 'Optimum Financial Services Ltd', code: 'optimum-financial' }
  ];

  availableForms: FormCard[] = [
    {
      id: 'troubleshooting',
      title: 'Device Troubleshooting',
      description: 'Report hardware crashes, OS errors, network connectivity issues, or malware alerts.',
      category: 'Hardware & OS Support',
      route: '/forms/device-troubleshooting',
      iconBg: 'bg-blue-500',
    },
    {
      id: 'replacement',
      title: 'Device Replacement',
      description: 'Request a swap for damaged hardware, end-of-life laptops, or upgraded mobile devices.',
      category: 'Asset Management',
      route: '/forms/device-replacement',
      iconBg: 'bg-purple-500',
    },
    {
      id: 'infrastructure',
      title: 'IT Infrastructure Receipt',
      description: 'Record and register new server equipment, network switches, firewalls, and hardware assets.',
      category: 'Infrastructure & Provisioning',
      route: '/forms/it-infrastructure-receipt',
      iconBg: 'bg-emerald-500',
    },
  ];

  constructor(private router: Router) {}

  toggleDropdown(formId: string): void {
    this.activeDropdownId = this.activeDropdownId === formId ? null : formId;
  }

  selectCompanyAndNavigate(route: string, companyCode: string): void {
    this.activeDropdownId = null;
    this.router.navigate([route], {
      queryParams: { company: companyCode }
    });
  }
}