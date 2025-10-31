# BIOPLUS Labs Backend API

A professional Node.js backend application for BIOPLUS Labs appointment booking system with email notifications.

## Features

- ✅ Appointment booking API endpoint
- ✅ Professional HTML email templates with BIOPLUS logo
- ✅ User confirmation emails
- ✅ Admin notification emails
- ✅ File upload support with security restrictions
- ✅ Input validation and error handling
- ✅ CORS configuration for frontend integration
- ✅ Vercel deployment ready
- ✅ Modular ES6 architecture

## API Endpoints

### Health Check
```
GET /api/health
```

### Get Available Services
```
GET /api/services
```

### Book Appointment
```
POST /api/book-appointment
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, required): Patient's full name
- `email` (string, required): Patient's email address
- `phone` (string, required): Patient's phone number
- `service` (string, required): Service requested
- `date` (string, required): Preferred date
- `time` (string, required): Preferred time
- `prescription` (boolean, optional): Whether prescription is uploaded
- `message` (string, optional): Additional message
- `comment` (string, optional): Additional comments (max 500 characters)
- `files` (file[], optional): Upload files (max 3 files, 5MB each)

**File Upload Restrictions:**
- **Maximum file size:** 5MB per file
- **Maximum files:** 3 files per request
- **Allowed file types:** Images (JPEG, PNG, GIF, WebP), PDF, Word documents, text files
- **Blocked file types:** Executable files (.exe, .bat, .js, .php, etc.)

**Response:**
```json
{
  "success": true,
  "message": "Appointment request submitted successfully! You will receive a confirmation email shortly.",
  "data": {
    "appointmentId": "APT-1704067200000",
    "name": "John Doe",
    "email": "john@example.com",
    "service": "Blood Test",
    "date": "2024-01-15",
    "time": "10:00 AM",
    "status": "pending_confirmation"
  }
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@biopluslab.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Gmail Setup (for email service)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Run the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## Project Structure

```
backend/
├── config/
│   ├── email.js              # Email configuration
│   └── fileUpload.js         # File upload configuration
├── controllers/
│   └── appointmentController.js  # Appointment logic
├── routes/
│   └── appointmentRoutes.js      # API routes
├── services/
│   └── emailService.js           # Email service
├── templates/
│   └── emailTemplates.js         # HTML email templates
├── static/
│   └── image.png                 # BIOPLUS logo
├── uploads/                       # Temporary file storage
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── server.js                     # Main application file
└── vercel.json                   # Vercel deployment config
```

## Email Templates

### User Confirmation Email
- Professional design with BIOPLUS Labs logo
- Appointment details summary
- Next steps information
- Contact information
- Responsive design
- File attachments included

### Admin Notification Email
- Urgent priority styling with BIOPLUS Labs logo
- Complete appointment details
- Action required section
- Professional formatting
- File attachments included

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `ADMIN_EMAIL`
   - `NODE_ENV=production`
4. Deploy!

## Testing the API

### Using curl (with file upload):
```bash
curl -X POST http://localhost:3000/api/book-appointment \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=+91 9876543210" \
  -F "service=Blood Test" \
  -F "date=2024-01-15" \
  -F "time=10:00 AM" \
  -F "prescription=false" \
  -F "comment=Please call me before the appointment" \
  -F "files=@/path/to/prescription.pdf"
```

### Using curl (without file upload):
```bash
curl -X POST http://localhost:3000/api/book-appointment \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=+91 9876543210" \
  -F "service=Blood Test" \
  -F "date=2024-01-15" \
  -F "time=10:00 AM" \
  -F "prescription=false" \
  -F "comment=Please call me before the appointment"
```

### Using Postman:
1. Set method to POST
2. URL: `http://localhost:3000/api/book-appointment`
3. Body: Select "form-data"
4. Add fields:
   - `name`: Test User
   - `email`: test@example.com
   - `phone`: +91 9876543210
   - `service`: Blood Test
   - `date`: 2024-01-15
   - `time`: 10:00 AM
   - `prescription`: false
   - `comment`: Please call me before the appointment
   - `files`: Select file(s) to upload

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Email format validation
- Phone number validation
- Comment length validation (max 500 characters)
- File upload validation (size, type, security)
- Email service error handling
- Proper HTTP status codes
- Detailed error messages
- Automatic file cleanup on errors

## Security Features

- CORS configuration
- Input sanitization
- File type validation (blocks executable files)
- File size restrictions
- Environment variable protection
- Error message sanitization in production
- Automatic file cleanup

## Support

For technical support or questions, contact the development team.

---

**BIOPLUS Labs** - Professional Laboratory Services
Site no: 25 & 26, Meena Estate, Sowripalayam Road, Coimbatore - 641028
Phone: +91 7418520528 | Website: https://www.biopluslab.com
