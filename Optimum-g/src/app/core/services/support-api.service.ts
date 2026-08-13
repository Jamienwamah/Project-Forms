import { Injectable, inject } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface TicketSubmission {
  formType: string;
  submittedAt: string;
  payload: Record<string, any>;
}

@Injectable({
  providedIn: 'root',
})
export class SupportApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.yourdomain.com/v1/tickets'; // Replace with real endpoint

  submitTicket(submission: TicketSubmission): Observable<{ success: boolean; ticketId: string }> {
    console.log('API Payload Sent:', submission);
    
    // Simulate API call with 'of()'; swap with real endpoint when ready:
    // return this.http.post<{ success: boolean; ticketId: string }>(this.apiUrl, submission);
    return of({ success: true, ticketId: 'INC-' + Math.floor(100000 + Math.random() * 900000) });
  }
}