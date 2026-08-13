import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface OstDeviceTroubleshootingPayload {
  currentDate: Date;
  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };
  device: {
    assetTag?: string;
    deviceType: string;
    brandModel: string;
    serialNumber: string;
    operatingSystem: string;
    developmentEnvironment?: string;
  };
  issue: {
    dateReported: string;
    reportedBy: string;
    description: string;
    startDate: string;
    troubleshootingAttempted: boolean;
    attemptedDetails?: string;
  };
  consent: {
    agreed: boolean;
  };
  signatures: {
    employee: string;
    employeeDate: string;
  };
  officialUse?: Record<string, any>;
}

@Component({
  selector: 'app-ost-device-troubleshooting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Navigation Header -->
        <div class="mb-6 flex items-center justify-between">
          <a routerLink="/" class="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Tech Portal
          </a>
          <span class="text-xs text-emerald-400 font-mono">Ref: OST-DEV-TS-2026</span>
        </div>

        <div class="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
          <!-- OST Banner -->
          <div class="bg-emerald-950 text-white p-6 sm:p-8 border-b border-emerald-800">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-xs font-semibold uppercase tracking-widest text-emerald-400">Optimum Software & Technologies</span>
                <h1 class="text-2xl font-bold mt-1">OST Engineering Device Report</h1>
                <p class="text-slate-300 text-sm mt-1">Technical hardware, Linux/macOS OS kernel, or dev container troubleshooting for OST team.</p>
              </div>
              <div class="text-right text-xs text-slate-400">
                <p>Date: <span class="font-semibold text-emerald-300">{{ currentDate | date:'mediumDate' }}</span></p>
              </div>
            </div>
          </div>

          <form [formGroup]="troubleshootingForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-8">

            <!-- SECTION 1: EMPLOYEE DETAILS -->
            <div formGroupName="employee" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">1. Developer / Staff Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Full Name *</label>
                  <input type="text" formControlName="name" placeholder="Alex Chen" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">OST Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="OST-DEV-309" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Engineering / Team *</label>
                  <input type="text" formControlName="department" placeholder="Backend Dev / Systems & Security" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Role Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="Software Engineer / DevOps" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                </div>
              </div>
            </div>

            <!-- SECTION 2: HARDWARE & OS DETAILS -->
            <div formGroupName="device" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">2. Hardware & Dev Environment</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Device Type *</label>
                  <select formControlName="deviceType" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="">Select Type</option>
                    <option value="Laptop">MacBook Pro / Developer Laptop</option>
                    <option value="Workstation">Linux Workstation</option>
                    <option value="Server">Dev Server / Lab Board</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="MacBook Pro M2 / Lenovo ThinkPad" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 sm:text-slate-300 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-882001X" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Operating System & Kernel *</label>
                  <input type="text" formControlName="operatingSystem" placeholder="macOS Sequoia / Ubuntu 24.04 LTS" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">OST Asset Tag</label>
                  <input type="text" formControlName="assetTag" placeholder="OST-DEV-0012" 
                    class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- SECTION 3: TECHNICAL INCIDENT -->
            <div formGroupName="issue" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">3. Issue Diagnostics</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Date Started *</label>
                  <input type="date" formControlName="startDate" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Date Reported *</label>
                  <input type="date" formControlName="dateReported" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Reported By *</label>
                  <input type="text" formControlName="reportedBy" placeholder="Self" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Description / Kernel Panics / Log Traces *</label>
                <textarea formControlName="description" rows="4" placeholder="Log trace snippet, thermal throttling, hardware failure, docker daemon issue..." 
                  class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
              </div>
            </div>

            <!-- SECTION 4: ACKNOWLEDGMENT -->
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">4. Confirmation & Authorization</h2>

              <div formGroupName="consent" class="p-4 bg-emerald-950/50 border border-emerald-800 rounded-lg">
                <div class="flex items-start">
                  <input type="checkbox" id="ostConsent" formControlName="agreed" class="mt-1 w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500" />
                  <label for="ostConsent" class="ml-3 text-xs text-emerald-200 leading-relaxed">
                    I authorize OST Systems/IT Operations to inspect, diagnose, and re-image or repair this development system.
                  </label>
                </div>
              </div>

              <div formGroupName="signatures" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Developer Signature *</label>
                  <input type="text" formControlName="employee" placeholder="Full name" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 uppercase mb-1">Date *</label>
                  <input type="date" formControlName="employeeDate" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
            </div>

            <!-- SUBMIT -->
            <div class="pt-6 border-t border-slate-700 flex items-center justify-end space-x-4">
              <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
                Submit OST Engineering Report
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OstDeviceTroubleshootingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  troubleshootingForm!: FormGroup;
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.troubleshootingForm = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employeeId: ['', Validators.required]
      }),
      device: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        operatingSystem: ['', Validators.required],
        developmentEnvironment: ['']
      }),
      issue: this.fb.group({
        dateReported: ['', Validators.required],
        reportedBy: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        troubleshootingAttempted: [false],
        attemptedDetails: ['']
      }),
      consent: this.fb.group({
        agreed: [false, Validators.requiredTrue]
      }),
      signatures: this.fb.group({
        employee: ['', Validators.required],
        employeeDate: [new Date().toISOString().substring(0, 10), Validators.required]
      })
    });
  }

  public onSubmit(): void {
    if (this.troubleshootingForm.valid) {
      const payload: OstDeviceTroubleshootingPayload = {
        currentDate: this.currentDate,
        ...this.troubleshootingForm.value
      };
      console.log('OST Form Submission Payload:', payload);
      alert('OST Troubleshooting report submitted successfully!');
      this.router.navigate(['/']);
    } else {
      this.troubleshootingForm.markAllAsTouched();
      alert('Please fill out all required fields.');
    }
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.troubleshootingForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}