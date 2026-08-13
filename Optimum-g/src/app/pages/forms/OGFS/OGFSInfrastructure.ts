import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface InfrastructureReceiptPayload {
  documentNo: string;
  dateReceived: string;
  procurement: {
    assetTag?: string;
    poNumber: string;
    invoiceNumber: string;
    vendorSupplier: string;
    deliveryNoteNumber: string;
    procuredBy: string;
    fundingSource?: string;
  };
  infrastructure: {
    category: string;
    brandModel: string;
    serialNumber: string;
    quantity: number;
    specifications?: string;
  };
  inspection: {
    physicalCondition: string;
    accessoriesIncluded: boolean;
    passedInspection: boolean;
    inspectedBy: string;
    inspectionDate: string;
    notes?: string;
  };
}

@Component({
  selector: 'app-ofs-infrastructure-receipt',
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
          <span class="text-xs text-slate-400 font-mono">Form Ref: OFS-INFRA-REG</span>
        </div>

        <!-- Success Alert Banner -->
        <div *ngIf="isSubmitted" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-sm font-medium text-emerald-900">Infrastructure asset registered and logged successfully!</span>
          </div>
          <button (click)="isSubmitted = false" class="text-xs font-semibold text-emerald-700 hover:underline">Dismiss</button>
        </div>

        <!-- Card Container -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          <!-- Banner Header -->
          <div class="bg-slate-900 text-white p-6 sm:p-8">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">Optimum Financial Services Ltd</span>
                <h1 class="text-2xl font-bold">IT Infrastructure Receipt & Registration</h1>
                <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Record and register new IT infrastructure, networking equipment, servers, and hardware prior to IT Asset Register entry and deployment.
                </p>
              </div>
            </div>
          </div>

          <form [formGroup]="receiptForm" (ngSubmit)="onSubmit()" class="p-6 sm:p-8 space-y-8">

            <!-- DOCUMENT METADATA -->
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Document No. *</label>
                <input type="text" formControlName="documentNo" placeholder="OFS-REG-2026-001" 
                  class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  [class.border-red-500]="isFieldInvalid('documentNo')" />
                <span *ngIf="isFieldInvalid('documentNo')" class="text-xs text-red-500 mt-1 block">Document number is required.</span>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Date Received *</label>
                <input type="date" formControlName="dateReceived" 
                  class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  [class.border-red-500]="isFieldInvalid('dateReceived')" />
                <span *ngIf="isFieldInvalid('dateReceived')" class="text-xs text-red-500 mt-1 block">Date received is required.</span>
              </div>
            </div>

            <!-- SECTION 1: PROCUREMENT INFORMATION -->
            <div formGroupName="procurement" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">1. Procurement Information</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Asset Tag (if applicable)</label>
                  <input type="text" formControlName="assetTag" placeholder="OFS-AST-8849" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">PO Number *</label>
                  <input type="text" formControlName="poNumber" placeholder="PO-2026-9041" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('procurement', 'poNumber')" />
                  <span *ngIf="isFieldInvalid('procurement', 'poNumber')" class="text-xs text-red-500 mt-1 block">PO Number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Invoice Number *</label>
                  <input type="text" formControlName="invoiceNumber" placeholder="INV-773012" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('procurement', 'invoiceNumber')" />
                  <span *ngIf="isFieldInvalid('procurement', 'invoiceNumber')" class="text-xs text-red-500 mt-1 block">Invoice number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Vendor / Supplier *</label>
                  <input type="text" formControlName="vendorSupplier" placeholder="Hardware Supplier Ltd / Dell Direct" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('procurement', 'vendorSupplier')" />
                  <span *ngIf="isFieldInvalid('procurement', 'vendorSupplier')" class="text-xs text-red-500 mt-1 block">Vendor required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Delivery Note Number *</label>
                  <input type="text" formControlName="deliveryNoteNumber" placeholder="DN-44019" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('procurement', 'deliveryNoteNumber')" />
                  <span *ngIf="isFieldInvalid('procurement', 'deliveryNoteNumber')" class="text-xs text-red-500 mt-1 block">Delivery Note required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Procured By *</label>
                  <input type="text" formControlName="procuredBy" placeholder="IT Procurement Officer" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('procurement', 'procuredBy')" />
                  <span *ngIf="isFieldInvalid('procurement', 'procuredBy')" class="text-xs text-red-500 mt-1 block">Procured By required.</span>
                </div>

                <div class="sm:col-span-2 lg:col-span-3">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Funding Source (Optional)</label>
                  <input type="text" formControlName="fundingSource" placeholder="OPEX / CAPEX Infrastructure Budget 2026" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- SECTION 2: INFRASTRUCTURE DETAILS -->
            <div formGroupName="infrastructure" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">2. Infrastructure & Asset Details</h2>
              
              <!-- Asset Category Selector -->
              <div>
                <label class="block text-xs font-medium text-slate-700 uppercase mb-2">Asset Category *</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  <label *ngFor="let cat of assetCategories" 
                    class="flex items-center p-2.5 border rounded-lg text-xs font-medium cursor-pointer transition-colors hover:bg-slate-50"
                    [class.border-indigo-600]="receiptForm.get('infrastructure.category')?.value === cat"
                    [class.bg-indigo-50]="receiptForm.get('infrastructure.category')?.value === cat">
                    <input type="radio" formControlName="category" [value]="cat" class="text-indigo-600 focus:ring-indigo-500" />
                    <span class="ml-2 text-slate-800">{{ cat }}</span>
                  </label>
                </div>
                <span *ngIf="isFieldInvalid('infrastructure', 'category')" class="text-xs text-red-500 mt-1 block">Please select an asset category.</span>
              </div>

              <!-- Hardware Specs -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Brand & Model *</label>
                  <input type="text" formControlName="brandModel" placeholder="Fortinet FortiGate 60F / Dell PowerEdge" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('infrastructure', 'brandModel')" />
                  <span *ngIf="isFieldInvalid('infrastructure', 'brandModel')" class="text-xs text-red-500 mt-1 block">Brand/Model required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Serial Number *</label>
                  <input type="text" formControlName="serialNumber" placeholder="FG-60FTK2100489" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('infrastructure', 'serialNumber')" />
                  <span *ngIf="isFieldInvalid('infrastructure', 'serialNumber')" class="text-xs text-red-500 mt-1 block">Serial number required.</span>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Quantity Received *</label>
                  <input type="number" formControlName="quantity" min="1" 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    [class.border-red-500]="isFieldInvalid('infrastructure', 'quantity')" />
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Technical Specifications / Notes</label>
                  <textarea formControlName="specifications" rows="3" placeholder="CPU, RAM, Storage, Port Configuration, Firmware Version..." 
                    class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"></textarea>
                </div>
              </div>
            </div>

            <!-- SECTION 3: INSPECTION & VERIFICATION -->
            <div formGroupName="inspection" class="space-y-4">
              <h2 class="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">3. Inspection & Quality Check</h2>

              <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Physical Condition *</label>
                    <select formControlName="physicalCondition" class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                      <option value="New / Intact">New / Intact (Sealed Packaging)</option>
                      <option value="Good Condition">Good Condition (Opened for Test)</option>
                      <option value="Damaged Box">Damaged Outer Box (Hardware Intact)</option>
                      <option value="Defective">Defective / Damaged on Arrival</option>
                    </select>
                  </div>

                  <div class="flex items-center space-x-6 pt-5">
                    <label class="flex items-center text-xs font-medium text-slate-700 cursor-pointer">
                      <input type="checkbox" formControlName="accessoriesIncluded" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                      <span class="ml-2">All Accessories Included</span>
                    </label>

                    <label class="flex items-center text-xs font-medium text-slate-700 cursor-pointer">
                      <input type="checkbox" formControlName="passedInspection" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span class="ml-2 font-semibold text-emerald-800">Passed Quality Check</span>
                    </label>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-3">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Inspected By (Tech) *</label>
                    <input type="text" formControlName="inspectedBy" placeholder="Receiving Tech Name" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      [class.border-red-500]="isFieldInvalid('inspection', 'inspectedBy')" />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-slate-700 uppercase mb-1">Inspection Date *</label>
                    <input type="date" formControlName="inspectionDate" 
                      class="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
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
                Register Infrastructure Asset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class OfsInfrastructureReceiptFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  receiptForm!: FormGroup;
  isSubmitted = false;

  assetCategories: string[] = [
    'Server',
    'Desktop Computer',
    'Laptop',
    'Monitor',
    'Printer',
    'Network Switch',
    'Router',
    'Firewall',
    'Wireless Access Point',
    'UPS',
    'NAS/SAN Storage',
    'CCTV Equipment',
    'Biometric'
  ];

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.receiptForm = this.fb.group({
      documentNo: ['', Validators.required],
      dateReceived: [today, Validators.required],

      // Procurement Info
      procurement: this.fb.group({
        assetTag: [''],
        poNumber: ['', Validators.required],
        invoiceNumber: ['', Validators.required],
        vendorSupplier: ['', Validators.required],
        deliveryNoteNumber: ['', Validators.required],
        procuredBy: ['', Validators.required],
        fundingSource: ['']
      }),

      // Infrastructure Details
      infrastructure: this.fb.group({
        category: ['', Validators.required],
        brandModel: ['', Validators.required],
        serialNumber: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        specifications: ['']
      }),

      // Inspection
      inspection: this.fb.group({
        physicalCondition: ['New / Intact', Validators.required],
        accessoriesIncluded: [true],
        passedInspection: [true, Validators.requiredTrue],
        inspectedBy: ['', Validators.required],
        inspectionDate: [today, Validators.required],
        notes: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.receiptForm.valid) {
      const payload: InfrastructureReceiptPayload = this.receiptForm.value;
      console.log('Infrastructure Receipt Payload:', payload);
      this.isSubmitted = true;
    } else {
      this.receiptForm.markAllAsTouched();
    }
  }

  public isFieldInvalid(groupNameOrControl: string, fieldName?: string): boolean {
    if (fieldName) {
      const field = this.receiptForm.get(`${groupNameOrControl}.${fieldName}`);
      return field ? field.invalid && (field.dirty || field.touched) : false;
    }
    const control = this.receiptForm.get(groupNameOrControl);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}