import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-replacement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './replacement.html'
})
export class DeviceReplacementFormComponent implements OnInit {
  replacementForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

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
}