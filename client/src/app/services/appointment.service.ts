import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AppointmentRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  prescription?: boolean;
  message?: string;
  comment?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data?: {
    appointmentId: string;
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    status: string;
  };
}

export interface Service {
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Book an appointment with file upload support
   */
  bookAppointment(formData: FormData): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.apiUrl}/api/book-appointment`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get available services
   */
  getServices(): Observable<Service[]> {
    return this.http.get<{success: boolean, data: string[]}>(`${this.apiUrl}/api/services`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data.map(service => ({
              label: service,
              value: service.toLowerCase().replace(/\s+/g, '-')
            }));
          }
          return [];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Health check
   */
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/health`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create FormData for appointment booking
   */
  createAppointmentFormData(appointmentData: AppointmentRequest, files?: File[]): FormData {
    const formData = new FormData();
    
    // Add basic appointment data
    formData.append('name', appointmentData.name);
    formData.append('email', appointmentData.email);
    formData.append('phone', appointmentData.phone);
    formData.append('service', appointmentData.service);
    formData.append('date', appointmentData.date);
    formData.append('time', appointmentData.time);
    formData.append('address', appointmentData.address);
    formData.append('prescription', appointmentData.prescription ? 'true' : 'false');
    
    if (appointmentData.message) {
      formData.append('message', appointmentData.message);
    }
    
    if (appointmentData.comment) {
      formData.append('comment', appointmentData.comment);
    }

    // Add files if provided
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }

    return formData;
  }

  /**
   * Format date for API
   */
  formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  /**
   * Format time for API
   */
  formatTimeForAPI(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
