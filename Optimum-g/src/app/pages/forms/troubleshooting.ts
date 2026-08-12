import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  templateUrl: './troubleshooting.html',
//   styleUrls: ['./device-troubleshooting.component.css']
})
export class DeviceTroubleshootingComponent implements OnInit {
  troubleshootingForm!: FormGroup;
  currentDate: Date = new Date();

  constructor(private fb: FormBuilder) {}

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