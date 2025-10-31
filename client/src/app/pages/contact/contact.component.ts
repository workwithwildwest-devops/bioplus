import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    InputTextarea, 
    ToastModule,
    HeaderComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [MessageService]
})
export class ContactComponent {
  
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private messageService: MessageService) {}

  onSubmit() {
    if (this.validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Contact Form:', this.contactForm);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Message Sent',
        detail: 'Thank you for contacting us! We will get back to you soon.'
      });

      this.resetForm();
    }
  }

  validateForm(): boolean {
    if (!this.contactForm.name.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your name'
      });
      return false;
    }

    if (!this.contactForm.email.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your email'
      });
      return false;
    }

    if (!this.contactForm.message.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter your message'
      });
      return false;
    }

    return true;
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
