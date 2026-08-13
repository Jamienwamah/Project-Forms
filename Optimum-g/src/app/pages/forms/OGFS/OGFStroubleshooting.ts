import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface OgfsDeviceTroubleshootingPayload {
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
  selector: 'app-ogfs-device-troubleshooting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Navigation Header -->
        <div class="mb-6 flex items-center justify-between">
          <a routerLink="/" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to IT Portal
          </a>
          <span class="text-xs text-slate-400 font-mono">Ref: OGFS-IT-TS-2026</span>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <!-- OGFS Banner -->
          <div class="bg-blue-900 text-white p-6 sm:p-8">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-xs font-semibold uppercase tracking-widest text-blue-300">Optimum Global Financial Services</span>
                <h1 class="text-2xl font-bold mt-1">OGFS Device Troubleshooting Form</h1>
                <p class="text-blue-100 text-sm mt-1">Submit hardware, operating system, or connectivity issues for OGFS staff.</p>
              </div>
              <div class="text-right text-xs text-blue-200">
                <p>Date: <span class="font-semibold text-white">{{ currentDate | date:'mediumDate' }}</span></p>
              </div>
            </div>
          </div>

          <form [formGroup]="troubleshootingForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-8">

            <!-- SECTION 1: EMPLOYEE DETAILS -->
            <div formGroupName="employee" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">1. Employee Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Full Name *</label>
                  <input type="text" formControlName="name" placeholder="Jane Doe" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block">Full Name is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">OGFS Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="OGFS-1042" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">Employee ID is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Department *</label>
                  <input type="text" formControlName="department" placeholder="Finance Operations / Risk" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block">Department is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Job Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="Financial Analyst" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block">Job Title is required.</span>
                </div>
              </div>
            </div>

            <!-- SECTION 2: DEVICE DETAILS -->
            <div formGroupName="device" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">2. OGFS Workstation Details</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                  <select formControlName="deviceType" class="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Corporate Laptop</option>
                    <option value="Desktop">Workstation Desktop</option>
                    <option value="Peripheral">Peripheral / Display</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5440" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'brandModel')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-982312A" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'serialNumber')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag (Optional)</label>
                  <input type="text" formControlName="assetTag" placeholder="OGFS-TAG-082" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Operating System *</label>
                  <input type="text" formControlName="operatingSystem" placeholder="Windows 11 Enterprise" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'operatingSystem')" />
                </div>
              </div>
            </div>

            <!-- SECTION 3: ISSUE DESCRIPTION -->
            <div formGroupName="issue" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">3. Technical Incident Summary</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Started *</label>
                  <input type="date" formControlName="startDate" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Reported *</label>
                  <input type="date" formControlName="dateReported" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Reported By *</label>
                  <input type="text" formControlName="reportedBy" placeholder="Self / Line Manager" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Detailed Incident Description *</label>
                <textarea formControlName="description" rows="4" placeholder="Detail system crashes, VPN disconnects, financial software errors, or hardware issues..." 
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
              </div>
            </div>

            <!-- SECTION 4: CONSENT & SIGNATURE -->
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">4. User Confirmation</h2>

              <div formGroupName="consent" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="flex items-start">
                  <input type="checkbox" id="ogfsConsent" formControlName="agreed" class="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <label for="ogfsConsent" class="ml-3 text-xs text-blue-900 leading-relaxed">
                    I authorize OGFS IT Support to perform diagnostic and remediation work on this equipment.
                  </label>
                </div>
              </div>

              <div formGroupName="signatures" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Digital Signature *</label>
                  <input type="text" formControlName="employee" placeholder="Type name to sign" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date *</label>
                  <input type="date" formControlName="employeeDate" class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <!-- SUBMIT -->
            <div class="pt-6 border-t border-slate-200 flex items-center justify-end space-x-4">
              <button type="submit" class="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
                Submit OGFS Incident
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OgfsDeviceTroubleshootingComponent implements OnInit {
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
        operatingSystem: ['', Validators.required]
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
      const payload: OgfsDeviceTroubleshootingPayload = {
        currentDate: this.currentDate,
        ...this.troubleshootingForm.value
      };
      console.log('OGFS Form Submission Payload:', payload);
      alert('OGFS Device Troubleshooting form submitted successfully!');
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