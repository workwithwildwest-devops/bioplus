# Frontend-Backend Integration Guide

## 🚀 **Integration Complete!**

Your Angular frontend is now fully integrated with the Node.js backend API. Here's what has been implemented:

### **📁 Files Created/Updated:**

#### **New Files:**
- `src/app/services/appointment.service.ts` - API service for backend communication
- `src/environments/environment.ts` - Development environment config
- `src/environments/environment.prod.ts` - Production environment config
- `src/app/components/api-test/api-test.component.ts` - API testing component

#### **Updated Files:**
- `src/app/components/appointment-dialog/appointment-dialog.component.ts` - Integrated with backend API
- `src/app/components/appointment-dialog/appointment-dialog.component.html` - Added comment field and updated file upload

### **🔧 Key Features Implemented:**

1. **API Service (`appointment.service.ts`):**
   - HTTP client integration
   - FormData creation for file uploads
   - Date/time formatting for API
   - Error handling
   - Service loading from backend

2. **Updated Appointment Dialog:**
   - Real API integration
   - File upload with proper validation
   - Comment field (max 500 characters)
   - Loading states
   - Error handling with user feedback

3. **Environment Configuration:**
   - Development: `http://localhost:3000`
   - Production: Update with your Vercel URL

### **📋 API Integration Details:**

#### **Appointment Booking:**
```typescript
// FormData includes:
- name, email, phone, service, date, time
- prescription (boolean)
- comment (optional, max 500 chars)
- files (optional, max 3 files, 5MB each)
```

#### **File Upload Restrictions:**
- **Max file size:** 5MB per file
- **Max files:** 3 files per request
- **Allowed types:** Images, PDF, Word docs, text files
- **Blocked types:** Executable files

### **🧪 Testing the Integration:**

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm install
   ng serve
   ```

3. **Test API Connection:**
   - Add `<app-api-test></app-api-test>` to any component template
   - Test health check and services endpoints

4. **Test Appointment Booking:**
   - Open appointment dialog
   - Fill form with test data
   - Upload files (optional)
   - Submit and check console for API calls

### **🔧 Configuration:**

#### **Environment Variables (Backend):**
Create `.env` file in backend directory:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@biopluslab.com
PORT=3000
NODE_ENV=development
```

#### **Production Deployment:**
1. Update `environment.prod.ts` with your Vercel URL
2. Deploy backend to Vercel
3. Update frontend environment
4. Deploy frontend

### **📧 Email Integration:**
- User confirmation emails with BIOPLUS logo
- Admin notification emails with file attachments
- Professional HTML templates
- Automatic file cleanup

### **🛡️ Security Features:**
- File type validation
- File size restrictions
- Executable file blocking
- Input sanitization
- CORS configuration

### **🎯 Next Steps:**

1. **Test the integration** with sample data
2. **Configure email settings** in backend `.env`
3. **Deploy to production** when ready
4. **Monitor logs** for any issues

The integration is complete and ready for testing! 🎉
