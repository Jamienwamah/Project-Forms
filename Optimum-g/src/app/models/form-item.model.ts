export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required: boolean;
  options?: string[]; // For dropdown/select fields
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: FormField[];
}

export interface FormSubmissionPayload {
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
}