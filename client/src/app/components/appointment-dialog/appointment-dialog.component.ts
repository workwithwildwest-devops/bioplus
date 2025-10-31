import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PrimeNG } from 'primeng/config';
import { ProgressBar } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { AppointmentService, AppointmentRequest, Service } from '../../services/appointment.service';
@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DialogModule, 
    ButtonModule, 
    InputTextModule, 
    CalendarModule, 
    DropdownModule, 
    FileUploadModule,
    ToastModule,
    ProgressBar,
    BadgeModule
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css',
  providers: [MessageService]
})
export class AppointmentDialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  appointmentForm = {
    name: '',
    contactNumber: '',
    address: '',
    email: '',
    service: '',
    dateTime: null as Date | null,
    prescription: null as File | null,
    comment: ''
  };

  services: Service[] = [];
  minDate = new Date();
  maxDate = new Date();
  index: any;
  isLoading = false;
  
  constructor(
    private messageService: MessageService,
    private config: PrimeNG,
    private appointmentService: AppointmentService
  ) {
    // Set max date to 3 months from now
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    this.loadServices();
  }

  onVisibleChange(visible: boolean) {
    this.visibleChange.emit(visible);
  }

  loadServices() {
    this.appointmentService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        // Fallback to default services if API fails
        this.services = [
          { label: 'Blood Test', value: 'Blood Test' },
          { label: 'Urine Test', value: 'Urine Test' },
          { label: 'Health Checkup', value: 'Health Checkup' },
          { label: 'COVID-19 Test', value: 'COVID-19 Test' },
          { label: 'Thyroid Test', value: 'Thyroid Test' },
          { label: 'Diabetes Test', value: 'Diabetes Test' },
          { label: 'Cardiac Tests', value: 'Cardiac Tests' },
          { label: 'Liver Function Test', value: 'Liver Function Test' },
          { label: 'Kidney Function Test', value: 'Kidney Function Test' },
          { label: 'Other', value: 'Other' }
        ];
      }
    });
  }

  onFileSelect(event: any) {
    this.appointmentForm.prescription = event.files[0];
  }

  onSubmit() {
    if (this.validateForm() && !this.isLoading) {
      this.isLoading = true;
      
      // Prepare appointment data
      const appointmentData: AppointmentRequest = {
        name: this.appointmentForm.name.trim(),
        email: this.appointmentForm.email.trim(),
        address: this.appointmentForm.address.trim(),
        phone: this.appointmentForm.contactNumber.trim(),
        service: this.appointmentForm.service,
        date: this.appointmentService.formatDateForAPI(this.appointmentForm.dateTime!),
        time: this.appointmentService.formatTimeForAPI(this.appointmentForm.dateTime!),
        prescription: this.files && this.files.length > 0,
        comment: this.appointmentForm.comment.trim()
      };

      // Prepare files for upload
      const filesToUpload: File[] = [];
      if (this.files && this.files.length > 0) {
        this.files.forEach((file: any) => {
          if (file instanceof File) {
            filesToUpload.push(file);
          }
        });
      }

      // Create FormData
      const formData = this.appointmentService.createAppointmentFormData(appointmentData, filesToUpload);

      // Submit to backend
      this.appointmentService.bookAppointment(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Appointment Booked Successfully!',
              detail: response.message || 'Your appointment has been successfully booked! You will receive a confirmation email shortly.'
            });
            this.resetForm();
            this.onVisibleChange(false);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Booking Failed',
              detail: response.message || 'Failed to book appointment. Please try again.'
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Appointment booking error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Booking Failed',
            detail: error.message || 'Failed to book appointment. Please try again or contact us directly.'
          });
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.appointmentForm.name.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your name'
      });
      return false;
    }

    if (!this.appointmentForm.contactNumber.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your contact number'
      });
      return false;
    }

    if (!this.appointmentForm.email.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your email'
      });
      return false;
    }

    if (!this.appointmentForm.service) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select a service'
      });
      return false;
    }

    if (!this.appointmentForm.dateTime) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select date and time'
      });
      return false;
    }

    return true;
  }

  resetForm() {
    this.appointmentForm = {
      name: '',
      contactNumber: '',
      address: '',
      email: '',
      service: '',
      dateTime: null,
      prescription: null,
      comment: ''
    };
    this.files = [];
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }
  files = [];

    totalSize : number = 0;

    totalSizePercent : number = 0;

    choose(event: any, callback: () => void) {
        callback();
    }

    onRemoveTemplatingFile(event: any, file: { size: any; }, removeFileCallback: (arg0: any, arg1: any) => void, index: any) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / (5 * 1024 * 1024); // 5MB limit
    }

    onClearTemplatingUpload(clear: () => void) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    onTemplatedUpload() {
        // This method is no longer needed since we handle upload in onSubmit
        console.log('Files selected for upload');
    }

    onSelectedFiles(event: any) {
        this.files = event.currentFiles;
        this.files.forEach((file:any) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / (5 * 1024 * 1024); // 5MB limit
    }

    uploadEvent(callback: () => void) {
        callback();
    }

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes:any = this.config.translation.fileSizeTypes;
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }
}
