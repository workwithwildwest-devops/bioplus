import EmailService from '../services/emailService.js';
import fs from 'fs';
import path from 'path';

class AppointmentController {
  constructor() {
    this.emailService = new EmailService();
  }

  // Book appointment endpoint
  async bookAppointment(req, res) {
    try {
      const {
        name,
        email,
        phone,
        service,
        address,
        date,
        time,
        prescription = false,
        message = '',
        comment = ''
      } = req.body;

      // Get uploaded files
      const uploadedFiles = req.files || [];

      // Validate required fields
      if (!name || !email || !phone || !service || !date || !time || !address) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields. Please provide name, email, phone, service, date, time, and address.'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }

      // Validate phone format (basic validation)
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid phone number.'
        });
      }

      // Validate comment length (max 500 characters)
      if (comment && comment.length > 500) {
        return res.status(400).json({
          success: false,
          message: 'Comment cannot exceed 500 characters.'
        });
      }

      // Prepare appointment data
      const appointmentData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        phone: phone.trim(),
        service: service.trim(),
        date: date.trim(),
        time: time.trim(),
        prescription: Boolean(prescription),
        message: message.trim(),
        comment: comment.trim(),
        files: uploadedFiles.map(file => ({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype
        }))
      };

      // Send emails
      const emailResult = await this.emailService.sendAppointmentEmails(appointmentData);

      // Log the appointment (in a real app, you'd save to database)
      console.log('New appointment booked:', {
        ...appointmentData,
        timestamp: new Date().toISOString(),
        emailResults: emailResult
      });

      // Return success response
      res.status(200).json({
        success: true,
        message: 'Appointment request submitted successfully! You will receive a confirmation email shortly.',
        data: {
          appointmentId: `APT-${Date.now()}`, // Temporary ID for reference
          name: appointmentData.name,
          email: appointmentData.email,
          address: appointmentData.address,
          service: appointmentData.service,
          date: appointmentData.date,
          time: appointmentData.time,
          status: 'pending_confirmation'
        }
      });

    } catch (error) {
      console.error('Error booking appointment:', error);
      
      // Clean up uploaded files in case of error
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          try {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
          }
        });
      }
      
      // Return appropriate error response
      res.status(500).json({
        success: false,
        message: 'Failed to process appointment request. Please try again or contact us directly.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Health check endpoint
  async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: 'BIOPLUS Labs API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }

  // Get available services (optional endpoint)
  async getServices(req, res) {
    const services = [
      'Blood Test',
      'Urine Test',
      'Health Checkup',
      'COVID-19 Test',
      'Thyroid Test',
      'Diabetes Test',
      'Cardiac Tests',
      'Liver Function Test',
      'Kidney Function Test',
      'Other'
    ];

    res.status(200).json({
      success: true,
      data: services
    });
  }
}

export default AppointmentController;
