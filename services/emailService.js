import { createTransporter } from '../config/email.js';
import { getUserEmailTemplate, getAdminEmailTemplate } from '../templates/emailTemplates.js';
import fs from 'fs';
import path from 'path';

class EmailService {
  constructor() {
    this.transporter = createTransporter();
  }

  async sendUserConfirmationEmail(appointmentData) {
    try {
      const { name, email, address, service, date, time, prescription, comment, files } = appointmentData;
      
      // Prepare attachments
      const attachments = [];
      
      // Add BIOPLUS logo
      const logoPath = path.join(process.cwd(), 'static', 'image.png');
      // if (fs.existsSync(logoPath)) {
      //   attachments.push({
      //     filename: 'bioplus-logo.png',
      //     path: logoPath,
      //     cid: 'bioplus-logo'
      //   });
      // }
      
      // Add user uploaded files
      if (files && files.length > 0) {
        files.forEach(file => {
          if (fs.existsSync(file.path)) {
            attachments.push({
              filename: file.originalname,
              path: file.path
            });
          }
        });
      }
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Appointment Request is Confirmed! | BIOPLUS Labs',
        html: getUserEmailTemplate({
          userName: name,
          address: address,
          service: service,
          date: date,
          time: time,
          prescription: prescription,
          comment: comment
        }),
        attachments: attachments
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('User confirmation email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending user confirmation email:', error);
      throw new Error('Failed to send user confirmation email');
    }
  }

  async sendAdminNotificationEmail(appointmentData) {
    try {
      const { name, email, address, phone, service, date, time, prescription, comment, files } = appointmentData;
      
      // Prepare attachments
      const attachments = [];
      
      // Add BIOPLUS logo
      const logoPath = path.join(process.cwd(), 'static', 'image.png');
      // if (fs.existsSync(logoPath)) {
      //   attachments.push({
      //     filename: 'bioplus-logo.png',
      //     path: logoPath,
      //     cid: 'bioplus-logo'
      //   });
      // }
      
      // Add user uploaded files
      if (files && files.length > 0) {
        files.forEach(file => {
          if (fs.existsSync(file.path)) {
            attachments.push({
              filename: file.originalname,
              path: file.path
            });
          }
        });
      }
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Appointment Booking: ${name} - ${service}`,
        html: getAdminEmailTemplate({
          userName: name,
          address: address,
          email: email,
          phone: phone,
          address: address,
          service: service,
          date: date,
          time: time,
          prescription: prescription,
          comment: comment
        }),
        attachments: attachments
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Admin notification email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending admin notification email:', error);
      throw new Error('Failed to send admin notification email');
    }
  }

  async sendAppointmentEmails(appointmentData) {
    try {
      // Send both emails in parallel
      const [userResult, adminResult] = await Promise.all([
        this.sendUserConfirmationEmail(appointmentData),
        this.sendAdminNotificationEmail(appointmentData)
      ]);

      // Clean up uploaded files after successful email sending
      this.cleanupFiles(appointmentData.files);

      return {
        success: true,
        userEmail: userResult,
        adminEmail: adminResult
      };
    } catch (error) {
      console.error('Error sending appointment emails:', error);
      throw error;
    }
  }

  // Clean up uploaded files
  cleanupFiles(files) {
    if (files && files.length > 0) {
      files.forEach(file => {
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
            console.log(`Cleaned up file: ${file.originalname}`);
          }
        } catch (error) {
          console.error(`Error cleaning up file ${file.originalname}:`, error);
        }
      });
    }
  }
}

export default EmailService;
