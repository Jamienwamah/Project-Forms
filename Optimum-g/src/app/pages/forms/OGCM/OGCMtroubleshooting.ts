import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface DeviceTroubleshootingPayload {
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
    itRep?: string;
    itTitle?: string;
    itSignature?: string;
    itDate?: string;
  };
  officialUse?: {
    receivedBy?: string;
    dateReceived?: string;
    assessment?: Record<string, boolean>;
    assessmentOther?: string;
    troubleshooting?: Record<string, boolean>;
    partsReplaced?: string;
    outcome?: string;
    dateReturned?: string;
    returnedBy?: string;
    userConfirmation?: string;
    confirmationDate?: string;
    additionalComments?: string;
  };
}

@Component({
  selector: 'app-device-troubleshooting',
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
            Back to Portal Landing
          </a>
          <span class="text-xs text-slate-400 font-mono">Form Ref: IT-TS-2026</span>
        </div>

        <!-- Card Container -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <!-- Banner -->
          <div class="bg-slate-900 text-white p-6 sm:p-8">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold">Device Troubleshooting Form</h1>
                <p class="text-slate-300 text-sm mt-1">Submit technical details for hardware, OS, or network issues.</p>
              </div>
              <div class="text-right text-xs text-slate-400">
                <p>Date: <span class="font-semibold text-slate-200">{{ currentDate | date:'mediumDate' }}</span></p>
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
                  <input type="text" formControlName="name" placeholder="John Doe" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                  <span *ngIf="isFieldInvalid('employee', 'name')" class="text-xs text-red-500 mt-1 block">Name is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="EMP-10492" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">Employee ID is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Department *</label>
                  <input type="text" formControlName="department" placeholder="Finance / Systems Engineering" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                  <span *ngIf="isFieldInvalid('employee', 'department')" class="text-xs text-red-500 mt-1 block">Department is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Job Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="IT Specialist" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                  <span *ngIf="isFieldInvalid('employee', 'jobTitle')" class="text-xs text-red-500 mt-1 block">Job Title is required.</span>
                </div>
              </div>
            </div>

            <!-- SECTION 2: DEVICE DETAILS -->
            <div formGroupName="device" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">2. Device Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                  <select formControlName="deviceType" class="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop / Workstation</option>
                    <option value="Mobile">Mobile / Tablet</option>
                    <option value="Peripheral">Peripheral / Other</option>
                  </select>
                  <span *ngIf="isFieldInvalid('device', 'deviceType')" class="text-xs text-red-500 mt-1 block">Select a device type.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5440" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'brandModel')" />
                  <span *ngIf="isFieldInvalid('device', 'brandModel')" class="text-xs text-red-500 mt-1 block">Brand/Model required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-982312A" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'serialNumber')" />
                  <span *ngIf="isFieldInvalid('device', 'serialNumber')" class="text-xs text-red-500 mt-1 block">Serial Number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag (Optional)</label>
                  <input type="text" formControlName="assetTag" placeholder="LAP-2026-0042" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Operating System *</label>
                  <input type="text" formControlName="operatingSystem" placeholder="Windows 11 Pro / macOS / Linux" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('device', 'operatingSystem')" />
                  <span *ngIf="isFieldInvalid('device', 'operatingSystem')" class="text-xs text-red-500 mt-1 block">OS field required.</span>
                </div>
              </div>
            </div>

            <!-- SECTION 3: ISSUE DETAILS -->
            <div formGroupName="issue" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">3. Issue Description & History</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Issue Started *</label>
                  <input type="date" formControlName="startDate" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'startDate')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Reported *</label>
                  <input type="date" formControlName="dateReported" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'dateReported')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Reported By *</label>
                  <input type="text" formControlName="reportedBy" placeholder="Employee / Manager" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('issue', 'reportedBy')" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Detailed Description *</label>
                <textarea formControlName="description" rows="4" placeholder="Describe error codes, blue screen crashes, or recent updates..." 
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  [class.border-red-500]="isFieldInvalid('issue', 'description')"></textarea>
                <span *ngIf="isFieldInvalid('issue', 'description')" class="text-xs text-red-500 mt-1 block">Description is required.</span>
              </div>

              <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div class="flex items-center">
                  <input type="checkbox" id="tsAttempted" formControlName="troubleshootingAttempted" 
                    class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <label for="tsAttempted" class="ml-2 text-sm font-medium text-slate-700">Have you attempted any prior troubleshooting?</label>
                </div>

                <div *ngIf="troubleshootingForm.get('issue.troubleshootingAttempted')?.value">
                  <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Attempted Details</label>
                  <input type="text" formControlName="attemptedDetails" placeholder="Rebooted device, ran SFC scan, reconnected cables..." 
                    class="w-full px-3 py-2 border bg-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- SECTION 4: CONSENT & SIGNATURES -->
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">4. User Consent & Signature</h2>

              <div formGroupName="consent" class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div class="flex items-start">
                  <input type="checkbox" id="consentAgree" formControlName="agreed" 
                    class="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <label for="consentAgree" class="ml-3 text-xs text-amber-900 leading-relaxed">
                    I confirm that the details provided are accurate. I acknowledge that IT Support may perform hardware diagnostics or OS updates, and I have backed up critical personal files.
                  </label>
                </div>
                <span *ngIf="isFieldInvalid('consent', 'agreed')" class="text-xs text-red-600 mt-1 block">Consent is required to submit.</span>
              </div>

              <div formGroupName="signatures" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Digital Signature (Full Name) *</label>
                  <input type="text" formControlName="employee" placeholder="Type name to sign" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('signatures', 'employee')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Signature Date *</label>
                  <input type="date" formControlName="employeeDate" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('signatures', 'employeeDate')" />
                </div>
              </div>
            </div>

            <!-- SECTION 5: OFFICIAL IT USE ONLY -->
            <div formGroupName="officialUse" class="pt-6 border-t-2 border-dashed border-slate-300 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-bold text-slate-500 uppercase tracking-wider">Official IT Desk Assessment</h2>
                <span class="text-xs px-2 py-1 bg-slate-200 text-slate-700 font-semibold rounded">Internal Use Only</span>
              </div>

              <div class="p-4 bg-slate-100 rounded-lg space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Received By (IT Tech)</label>
                    <input type="text" formControlName="receivedBy" placeholder="Technician Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Date Received</label>
                    <input type="date" formControlName="dateReceived" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div formGroupName="assessment">
                  <label class="block text-xs font-semibold text-slate-700 uppercase mb-2">Technical Assessment</label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="hardware" /> <span>Hardware Issue</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="software" /> <span>Software Crash</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="network" /> <span>Network / VPN</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="os" /> <span>OS Corruption</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="malware" /> <span>Malware Alert</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="userConfig" /> <span>User Misconfig</span></label>
                  </div>
                </div>

                <div formGroupName="troubleshooting">
                  <label class="block text-xs font-semibold text-slate-700 uppercase mb-2">Troubleshooting Actions</label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="hwDiag" /> <span>HW Diagnostics</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="osRepair" /> <span>OS SFC / DISM Repair</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="driverUpdates" /> <span>Driver Updates</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="swReinstall" /> <span>SW Reinstall</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="malwareRemoval" /> <span>EDR Scan & Removal</span></label>
                    <label class="flex items-center space-x-2"><input type="checkbox" formControlName="winUpdates" /> <span>Windows Updates</span></label>
                  </div>
                </div>
              </div>
            </div>

            <!-- BUTTONS -->
            <div class="pt-6 border-t border-slate-200 flex items-center justify-end space-x-4">
              <a routerLink="/" class="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors">
                Cancel
              </a>
              <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
                Submit Troubleshooting Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class DeviceTroubleshootingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  troubleshootingForm!: FormGroup;
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
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
        employeeDate: [new Date().toISOString().substring(0, 10), Validators.required],
        itRep: [''],
        itTitle: [''],
        itSignature: [''],
        itDate: ['']
      }),
      officialUse: this.fb.group({
        receivedBy: [''],
        dateReceived: [''],
        assessment: this.fb.group({
          hardware: [false],
          software: [false],
          network: [false],
          os: [false],
          malware: [false],
          userConfig: [false]
        }),
        assessmentOther: [''],
        troubleshooting: this.fb.group({
          hwDiag: [false],
          osRepair: [false],
          driverUpdates: [false],
          swReinstall: [false],
          malwareRemoval: [false],
          winUpdates: [false],
          dataBackup: [false],
          pwdReset: [false],
          hwReplacement: [false]
        }),
        partsReplaced: [''],
        outcome: [''],
        dateReturned: [''],
        returnedBy: [''],
        userConfirmation: [''],
        confirmationDate: [''],
        additionalComments: ['']
      })
    });
  }

  public onSubmit(): void {
    if (this.troubleshootingForm.valid) {
      const payload: DeviceTroubleshootingPayload = {
        currentDate: this.currentDate,
        ...this.troubleshootingForm.value
      };
      console.log('Form Payload (Typed TS):', payload);
      alert('Device Troubleshooting Form submitted successfully!');
      this.router.navigate(['/']);
    } else {
      this.troubleshootingForm.markAllAsTouched();
      alert('Please complete all required fields before submitting.');
    }
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.troubleshootingForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}