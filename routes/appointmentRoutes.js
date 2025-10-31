import express from 'express';
import AppointmentController from '../controllers/appointmentController.js';
import { upload } from '../config/fileUpload.js';

const router = express.Router();
const appointmentController = new AppointmentController();

// Health check route
router.get('/health', (req, res) => appointmentController.healthCheck(req, res));

// Get available services
router.get('/services', (req, res) => appointmentController.getServices(req, res));

// Book appointment route with file upload support
router.post('/book-appointment', upload.array('files', 3), (req, res) => appointmentController.bookAppointment(req, res));

// Catch-all route for undefined endpoints
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/services',
      'POST /api/book-appointment'
    ]
  });
});

export default router;
