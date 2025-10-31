import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';


@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">API Connection Test</h3>
      <div class="space-y-2">
        <button 
          (click)="testHealthCheck()" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Test Health Check
        </button>
        <button 
          (click)="testServices()" 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Test Services API
        </button>
      </div>
      <div *ngIf="testResult" class="mt-4 p-3 bg-white rounded border">
        <pre>{{ testResult | json }}</pre>
      </div>
    </div>
  `
})
export class ApiTestComponent {
  testResult: any = null;

  constructor(private appointmentService: AppointmentService) {}

  testHealthCheck() {
    this.appointmentService.healthCheck().subscribe({
      next: (result) => {
        this.testResult = { type: 'Health Check', result };
      },
      error: (error) => {
        this.testResult = { type: 'Health Check Error', error: error.message };
      }
    });
  }

  testServices() {
    this.appointmentService.getServices().subscribe({
      next: (result) => {
        this.testResult = { type: 'Services', result };
      },
      error: (error) => {
        this.testResult = { type: 'Services Error', error: error.message };
      }
    });
  }
}
