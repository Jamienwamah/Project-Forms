import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-replacement-form',
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
          <span class="text-xs text-slate-400 font-mono">Form Ref: IT-REP-2026</span>
        </div>

        <!-- Success Alert Banner -->
        <div *ngIf="isSubmitted" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-sm font-medium text-emerald-900">Device replacement request submitted successfully!</span>
          </div>
          <button (click)="isSubmitted = false" class="text-xs font-semibold text-emerald-700 hover:underline">Dismiss</button>
        </div>

        <!-- Card Container -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <!-- Banner Header -->
          <div class="bg-slate-900 text-white p-6 sm:p-8">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold">Device Replacement & Reissue Form</h1>
                <p class="text-slate-300 text-sm mt-1">Record hardware exchanges, asset decommission, and new device assignments.</p>
              </div>
              <div class="text-right text-xs text-slate-400">
                <p>Form Date</p>
                <p class="font-semibold text-slate-200 font-mono">{{ replacementForm.get('formDate')?.value }}</p>
              </div>
            </div>
          </div>

          <form [formGroup]="replacementForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-8">

            <!-- SECTION 1: EMPLOYEE INFORMATION -->
            <div formGroupName="employee" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">1. Employee Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Full Name *</label>
                  <input type="text" formControlName="fullName" placeholder="Jane Doe" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'fullName')" />
                  <span *ngIf="isFieldInvalid('employee', 'fullName')" class="text-xs text-red-500 mt-1 block">Full name is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="EMP-20391" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                  <span *ngIf="isFieldInvalid('employee', 'employeeId')" class="text-xs text-red-500 mt-1 block">Employee ID is required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Department *</label>
                  <input type="text" formControlName="department" placeholder="Security Operations / Systems Engineering" 
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

            <!-- SECTION 2: PREVIOUS DEVICE (DECOMMISSION/RETURN) -->
            <div formGroupName="previousDevice" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">2. Previous Device (Being Replaced)</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                  <select formControlName="deviceType" class="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('previousDevice', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Workstation">Workstation / Desktop</option>
                    <option value="Tablet">Tablet / Mobile</option>
                    <option value="Monitor">Monitor / Display</option>
                  </select>
                  <span *ngIf="isFieldInvalid('previousDevice', 'deviceType')" class="text-xs text-red-500 mt-1 block">Select device type.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5430" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('previousDevice', 'brandModel')" />
                  <span *ngIf="isFieldInvalid('previousDevice', 'brandModel')" class="text-xs text-red-500 mt-1 block">Model required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-99812B" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('previousDevice', 'serialNumber')" />
                  <span *ngIf="isFieldInvalid('previousDevice', 'serialNumber')" class="text-xs text-red-500 mt-1 block">Serial number required.</span>
                </div>

                <div class="sm:col-span-1">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag (Optional)</label>
                  <input type="text" formControlName="assetTag" placeholder="LAP-2024-88" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Reason for Replacement *</label>
                  <input type="text" formControlName="reasonForReplacement" placeholder="End of lifecycle, persistent hardware failure, upgrade..." 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('previousDevice', 'reasonForReplacement')" />
                  <span *ngIf="isFieldInvalid('previousDevice', 'reasonForReplacement')" class="text-xs text-red-500 mt-1 block">Reason is required.</span>
                </div>
              </div>
            </div>

            <!-- SECTION 3: REPLACEMENT DEVICE (NEW ASSIGNMENT) -->
            <div formGroupName="replacementDevice" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">3. Replacement Device Assigned</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                  <select formControlName="deviceType" class="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDevice', 'deviceType')">
                    <option value="">Select Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Workstation">Workstation / Desktop</option>
                    <option value="Tablet">Tablet / Mobile</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Lenovo ThinkPad T14 Gen 4" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDevice', 'brandModel')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="SN-102938C" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('replacementDevice', 'serialNumber')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">New Asset Tag</label>
                  <input type="text" formControlName="assetTag" placeholder="LAP-2026-104" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Issued *</label>
                  <input type="date" formControlName="dateIssued" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Accessories Issued</label>
                  <input type="text" formControlName="accessoriesIssued" placeholder="65W USB-C Charger, Dock, Mouse" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- SECTION 4: CONSENT & ACKNOWLEDGMENT -->
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">4. Acknowledgment & Employee Signature</h2>

              <div formGroupName="consent" class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg space-y-4">
                <div class="flex items-start">
                  <input type="checkbox" id="agreed" formControlName="agreed" 
                    class="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <label for="agreed" class="ml-3 text-xs text-indigo-950 leading-relaxed">
                    I acknowledge receipt of the replacement hardware listed above in good working condition. I agree to return all prior assets assigned to me, maintain security compliance, and adhere to acceptable corporate equipment use policies.
                  </label>
                </div>
                <span *ngIf="isFieldInvalid('consent', 'agreed')" class="text-xs text-red-600 block">You must agree to the acknowledgment to proceed.</span>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee Digital Signature (Typed Name) *</label>
                    <input type="text" formControlName="employeeSignature" placeholder="Jane Doe" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      [class.border-red-500]="isFieldInvalid('consent', 'employeeSignature')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Signature Date *</label>
                    <input type="date" formControlName="employeeSignatureDate" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 5: OFFICIAL USE ONLY -->
            <div formGroupName="officialUse" class="pt-6 border-t-2 border-dashed border-slate-300 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-bold text-slate-500 uppercase tracking-wider">IT Operations & Inventory Verification</h2>
                <span class="text-xs px-2 py-1 bg-slate-200 text-slate-700 font-semibold rounded">Internal Use Only</span>
              </div>

              <div class="p-4 bg-slate-100 rounded-lg space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Issued By (IT Tech)</label>
                    <input type="text" formControlName="issuedBy" placeholder="Technician Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Configured By</label>
                    <input type="text" formControlName="configuredBy" placeholder="Systems Admin" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Date Issued</label>
                    <input type="date" formControlName="issuedByDate" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                  <div class="flex items-center space-x-2 pt-5">
                    <input type="checkbox" id="oldDeviceReturned" formControlName="oldDeviceReturned" class="w-4 h-4 text-indigo-600 rounded" />
                    <label for="oldDeviceReturned" class="text-xs font-semibold text-slate-700 uppercase">Old Device Handed In</label>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Returned Condition</label>
                    <select formControlName="returnedCondition" class="w-full px-3 py-2 bg-white border rounded-lg text-sm">
                      <option value="Good">Good / Working</option>
                      <option value="Damaged">Damaged / Needs Repair</option>
                      <option value="Obsolete">Obsolete / Scrap</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Received By (IT Rep)</label>
                    <input type="text" formControlName="oldDeviceReceivedBy" placeholder="Rep Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Asset Register Updated By</label>
                    <input type="text" formControlName="assetRegisterUpdatedBy" placeholder="Asset Manager Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 uppercase mb-1">Asset Log Update Date</label>
                    <input type="date" formControlName="dateUpdated" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
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
                Submit Replacement Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OGCMReplacement implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  replacementForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.replacementForm = this.fb.group({
      formDate: [today, Validators.required],

      // Employee Information
      employee: this.fb.group({
        fullName: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employeeId: ['', Validators.required]
      }),

      // Previous Device
      previousDevice: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        reasonForReplacement: ['', Validators.required]
      }),

      // Replacement Device
      replacementDevice: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        accessoriesIssued: [''],
        dateIssued: [today, Validators.required]
      }),

      // Acknowledgment & Signatures
      consent: this.fb.group({
        agreed: [false, Validators.requiredTrue],
        employeeSignature: ['', Validators.required],
        employeeSignatureDate: [today, Validators.required],
        authorizedRepName: [''],
        authorizedRepTitle: [''],
        authorizedRepSignature: ['']
      }),

      // Official Use Only
      officialUse: this.fb.group({
        issuedBy: [''],
        issuedBySignature: [''],
        issuedByDate: [''],
        authRepName: [''],
        authRepTitle: [''],
        authRepSignature: [''],
        authRepDate: [''],
        oldDeviceReturned: [false],
        returnedCondition: ['Good'],
        oldDeviceReceivedBy: [''],
        dateReceived: [''],
        configuredBy: [''],
        assetRegisterUpdatedBy: [''],
        dateUpdated: [''],
        additionalComments: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.replacementForm.valid) {
      console.log('Form Payload Submitted:', this.replacementForm.value);
      this.isSubmitted = true;
    } else {
      this.replacementForm.markAllAsTouched();
    }
  }

  public isFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.replacementForm.get(`${groupName}.${fieldName}`);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}