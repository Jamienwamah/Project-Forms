import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface DeviceReplacementPayload {
  date: string;
  employee: {
    name: string;
    department: string;
    jobTitle: string;
    employeeId: string;
  };
  previousDevice: {
    assetTag?: string;
    deviceType: string;
    brandModel: string;
    serialNumber: string;
    reasonForReplacement: string;
  };
  replacementDevice: {
    assetTag?: string;
    deviceType: string;
    brandModel: string;
    serialNumber: string;
    accessoriesIssued: string;
    dateIssued: string;
  };
  acknowledgment: {
    agreedToTerms: boolean;
    employeeSignatureName: string;
    employeeSignatureDate: string;
  };
  officialUse: {
    issuedBy: string;
    issueDate: string;
    authorizedRepresentative: string;
    authorizedTitle: string;
    oldDeviceReturned: boolean;
    conditionOfReturnedDevice: string;
    oldDeviceReceivedBy: string;
    dateReceived: string;
    replacementConfiguredBy: string;
    assetRegisterUpdatedBy: string;
    dateUpdated: string;
    additionalComments?: string;
  };
}

@Component({
  selector: 'app-ofs-device-replacement',
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
          <span class="text-xs text-slate-400 font-mono">Form Ref: OFS-DEV-RPL</span>
        </div>

        <!-- Success Alert Banner -->
        <div *ngIf="isSubmitted" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-sm font-medium text-emerald-900">Device Replacement Form submitted successfully!</span>
          </div>
          <button (click)="isSubmitted = false" class="text-xs font-semibold text-emerald-700 hover:underline">Dismiss</button>
        </div>

        <!-- Card Container -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <!-- Banner Header -->
          <div class="bg-slate-900 text-white p-6 sm:p-8">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">Optimum Financial Services Limited</span>
                <h1 class="text-2xl font-bold">Device Replacement Consent Form</h1>
                <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Agreement regarding the replacement and continued use of company-issued devices in compliance with corporate IT policies.
                </p>
              </div>
            </div>
          </div>

          <form [formGroup]="replacementForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-8">

            <!-- FORM METADATA -->
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
              <span class="text-xs font-semibold text-slate-600 uppercase">Document Request Date</span>
              <input type="date" formControlName="date" class="px-3 py-1.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>

            <!-- SECTION 1: EMPLOYEE INFORMATION -->
            <div formGroupName="employee" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">1. Employee Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee Full Name *</label>
                  <input type="text" formControlName="name" placeholder="John Doe" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'name')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee ID *</label>
                  <input type="text" formControlName="employeeId" placeholder="EMP-1042" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'employeeId')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Department *</label>
                  <input type="text" formControlName="department" placeholder="Finance & Accounts" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'department')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Job Title *</label>
                  <input type="text" formControlName="jobTitle" placeholder="Financial Accountant" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('employee', 'jobTitle')" />
                </div>
              </div>
            </div>

            <!-- SECTION 2: DEVICE REPLACEMENT DETAILS -->
            <div class="space-y-6">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">2. Device Replacement Details</h2>

              <!-- Previously Assigned Device -->
              <div formGroupName="previousDevice" class="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Previously Assigned Device</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag</label>
                    <input type="text" formControlName="assetTag" placeholder="OFS-AST-0192" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                    <input type="text" formControlName="deviceType" placeholder="Laptop / Desktop" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('previousDevice', 'deviceType')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand / Model *</label>
                    <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5420" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('previousDevice', 'brandModel')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                    <input type="text" formControlName="serialNumber" placeholder="SN-98210492" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('previousDevice', 'serialNumber')" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Reason for Replacement *</label>
                  <textarea formControlName="reasonForReplacement" rows="2" placeholder="Hardware degradation, physical damage, lifecycle upgrade..." 
                    class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('previousDevice', 'reasonForReplacement')"></textarea>
                </div>
              </div>

              <!-- Replacement Device -->
              <div formGroupName="replacementDevice" class="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-4">
                <h3 class="text-sm font-bold text-indigo-900 uppercase tracking-wider">Replacement Device</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag</label>
                    <input type="text" formControlName="assetTag" placeholder="OFS-AST-0481" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Device Type *</label>
                    <input type="text" formControlName="deviceType" placeholder="Laptop" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('replacementDevice', 'deviceType')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand / Model *</label>
                    <input type="text" formControlName="brandModel" placeholder="Dell Latitude 5440" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('replacementDevice', 'brandModel')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                    <input type="text" formControlName="serialNumber" placeholder="SN-10293847" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('replacementDevice', 'serialNumber')" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="sm:col-span-2">
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Accessories Issued *</label>
                    <input type="text" formControlName="accessoriesIssued" placeholder="Charger, Laptop Bag, Wireless Mouse, USB-C Dock" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm"
                      [class.border-red-500]="isFieldInvalid('replacementDevice', 'accessoriesIssued')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Issued *</label>
                    <input type="date" formControlName="dateIssued" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 3: TERMS AND CONDITIONS -->
            <div class="space-y-3 p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Terms and Conditions</h3>
              <ol class="list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
                <li><strong class="text-slate-800">Ownership:</strong> The laptop is the property of Optimum Financial Services Limited and is provided solely for work-related purposes.</li>
                <li><strong class="text-slate-800">Usage:</strong> I will use the laptop responsibly and follow company policies, data security, and confidentiality guidelines.</li>
                <li><strong class="text-slate-800">Care and Maintenance:</strong> I am responsible for the proper care and maintenance of the laptop. Any loss or damage due to negligence will be my responsibility, and I may be required to cover repair or replacement costs.</li>
                <li><strong class="text-slate-800">Return:</strong> Upon termination of my employment or at the company’s request, I will return the laptop and all associated accessories in good working condition.</li>
                <li><strong class="text-slate-800">Inspection:</strong> The company reserves the right to inspect the laptop at any time to ensure compliance with company policies.</li>
                <li><strong class="text-slate-800">Reporting Issues:</strong> I will promptly report any technical issues, theft, loss, or damage to the IT department.</li>
              </ol>
            </div>

            <!-- SECTION 4: ACKNOWLEDGMENT -->
            <div formGroupName="acknowledgment" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">3. Employee Acknowledgment</h2>

              <label class="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" formControlName="agreedToTerms" class="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                <span class="text-xs text-slate-700 leading-normal">
                  By signing/confirming below, I confirm that I have read, understood, and agreed to the terms outlined above. I accept responsibility for the company-provided laptop under these conditions.
                </span>
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Employee Signature (Typed) *</label>
                  <input type="text" formControlName="employeeSignatureName" placeholder="Full Name as Signature" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('acknowledgment', 'employeeSignatureName')" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date *</label>
                  <input type="date" formControlName="employeeSignatureDate" class="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
            </div>

            <!-- SECTION 5: FOR OFFICIAL USE ONLY -->
            <div formGroupName="officialUse" class="space-y-4 pt-4 border-t-2 border-dashed border-slate-300">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">For Official Use Only — IT Department & Authorization</span>
              </div>

              <div class="p-4 bg-slate-100 border border-slate-200 rounded-lg space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Issued By (IT Staff)</label>
                    <input type="text" formControlName="issuedBy" placeholder="IT Officer Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Issue Date</label>
                    <input type="date" formControlName="issueDate" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Authorized Representative</label>
                    <input type="text" formControlName="authorizedRepresentative" placeholder="IT Manager / Dept Head" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-200 pt-3">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Old Device Returned?</label>
                    <select formControlName="oldDeviceReturned" class="w-full px-3 py-2 bg-white border rounded-lg text-sm">
                      <option [ngValue]="true">Yes</option>
                      <option [ngValue]="false">No</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Returned Condition</label>
                    <select formControlName="conditionOfReturnedDevice" class="w-full px-3 py-2 bg-white border rounded-lg text-sm">
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Old Device Received By</label>
                    <input type="text" formControlName="oldDeviceReceivedBy" placeholder="IT Receiver" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Received</label>
                    <input type="date" formControlName="dateReceived" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-3">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Replacement Configured By</label>
                    <input type="text" formControlName="replacementConfiguredBy" placeholder="SysAdmin / Tech Name" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Register Updated By</label>
                    <input type="text" formControlName="assetRegisterUpdatedBy" placeholder="Asset Officer" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Register Updated</label>
                    <input type="date" formControlName="dateUpdated" class="w-full px-3 py-2 bg-white border rounded-lg text-sm" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Additional Comments</label>
                  <textarea formControlName="additionalComments" rows="2" placeholder="Notes on transfer, data migration, special configurations..." class="w-full px-3 py-2 bg-white border rounded-lg text-sm"></textarea>
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
export class OfsDeviceReplacementFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  replacementForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.replacementForm = this.fb.group({
      date: [today, Validators.required],

      employee: this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        jobTitle: ['', Validators.required],
        employeeId: ['', Validators.required]
      }),

      previousDevice: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        reasonForReplacement: ['', Validators.required]
      }),

      replacementDevice: this.fb.group({
        assetTag: [''],
        deviceType: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        accessoriesIssued: ['', Validators.required],
        dateIssued: [today, Validators.required]
      }),

      acknowledgment: this.fb.group({
        agreedToTerms: [false, Validators.requiredTrue],
        employeeSignatureName: ['', Validators.required],
        employeeSignatureDate: [today, Validators.required]
      }),

      officialUse: this.fb.group({
        issuedBy: [''],
        issueDate: [today],
        authorizedRepresentative: [''],
        authorizedTitle: [''],
        oldDeviceReturned: [true],
        conditionOfReturnedDevice: ['Good'],
        oldDeviceReceivedBy: [''],
        dateReceived: [today],
        replacementConfiguredBy: [''],
        assetRegisterUpdatedBy: [''],
        dateUpdated: [today],
        additionalComments: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.replacementForm.valid) {
      const payload: DeviceReplacementPayload = this.replacementForm.value;
      console.log('OFS Device Replacement Payload:', payload);
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