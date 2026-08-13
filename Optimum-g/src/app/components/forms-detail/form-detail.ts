import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormApiService } from '../../core/services/form-api.service';
import { FormSchema } from '../../core/models/form.model';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div class="max-w-2xl mx-auto">
        <!-- Back Navigation -->
        <a routerLink="/" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6">
          &larr; Back to all forms
        </a>

        <!-- Form Card -->
        <div *ngIf="schema" class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div class="border-b border-slate-100 pb-5 mb-6">
            <h1 class="text-2xl font-bold text-slate-900">{{ schema.title }}</h1>
            <p class="text-sm text-slate-500 mt-1">{{ schema.description }}</p>
          </div>

          <!-- Dynamic Form -->
          <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div *ngFor="let field of schema.fields" class="flex flex-col">
              <label [for]="field.name" class="text-sm font-medium text-slate-700 mb-1">
                {{ field.label }} <span *ngIf="field.required" class="text-red-500">*</span>
              </label>

              <!-- Text Input -->
              <input
                *ngIf="field.type === 'text' || field.type === 'email'"
                [type]="field.type"
                [id]="field.name"
                [formControlName]="field.name"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

              <!-- Textarea -->
              <textarea
                *ngIf="field.type === 'textarea'"
                [id]="field.name"
                [formControlName]="field.name"
                rows="4"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>

              <!-- Dropdown Select -->
              <select
                *ngIf="field.type === 'select'"
                [id]="field.name"
                [formControlName]="field.name"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="">Select an option</option>
                <option *ngFor="let opt of field.options" [value]="opt">{{ opt }}</option>
              </select>

              <!-- Field Validation Error -->
              <span
                *ngIf="dynamicForm.get(field.name)?.touched && dynamicForm.get(field.name)?.invalid"
                class="text-xs text-red-500 mt-1"
              >
                This field is required.
              </span>
            </div>

            <!-- Submit Buttons -->
            <div class="pt-4 flex items-center justify-end space-x-3">
              <a routerLink="/" class="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
                Cancel
              </a>
              <button
                type="submit"
                [disabled]="dynamicForm.invalid || isSubmitting"
                class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class FormDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private formApi = inject(FormApiService);

  schema?: FormSchema;
  dynamicForm: FormGroup = this.fb.group({});
  isSubmitting = false;

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    if (formId) {
      this.formApi.getFormById(formId).subscribe((schema) => {
        if (schema) {
          this.schema = schema;
          this.buildForm(schema);
        }
      });
    }
  }

  private buildForm(schema: FormSchema): void {
    const group: Record<string, any> = {};
    schema.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'email') validators.push(Validators.email);
      group[field.name] = ['', validators];
    });
    this.dynamicForm = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.dynamicForm.valid && this.schema) {
      this.isSubmitting = true;
      const payload = {
        formId: this.schema.id,
        data: this.dynamicForm.value,
        submittedAt: new Date().toISOString(),
      };

      this.formApi.submitForm(payload).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          alert(res.message);
          this.router.navigate(['/']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}