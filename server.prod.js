import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import appointmentRoutes from './routes/appointmentRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.biopluslab.com', 'https://biopluslab.com','https://bioplus-zeta.vercel.app'] 
    : ['http://localhost:4200', 'http://localhost:3000','https://bioplus-zeta.vercel.app'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', appointmentRoutes);

// Serve static files from Angular build
const angularBuildPath = path.join(__dirname, 'dist', 'browser');
app.use(express.static(angularBuildPath));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(angularBuildPath, 'index.html'));
});

// API info route
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to BIOPLUS Labs API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      services: 'GET /api/services',
      bookAppointment: 'POST /api/book-appointment'
    },
    documentation: 'Contact admin for API documentation'
  });
});

// Catch-all handler: send back Angular's index.html file for any non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'API endpoint not found',
      path: req.path
    });
  }
  
  // Serve Angular app for all other routes (SPA routing)
  res.sendFile(path.join(angularBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BIOPLUS Labs Full-Stack server running on port ${PORT}`);
  console.log(`📧 Email service configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Serving Angular build from: ${angularBuildPath}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/services`);
  console.log(`   - POST /api/book-appointment`);
  console.log(`   - GET  / (Angular App)`);
});

export default app;
