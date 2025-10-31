# BIOPLUS Labs - Full-Stack Deployment Guide

## 🚀 **Complete Deployment Setup**

This guide will help you deploy your full-stack BIOPLUS Labs application (Angular frontend + Node.js backend) to Vercel.

### **📁 Project Structure After Build**
```
bioplus/
├── backend/
│   ├── dist/                    # Angular build (copied during build)
│   │   └── bioplus/
│   ├── server.prod.js          # Production server
│   ├── server.js               # Development server
│   ├── vercel.json             # Vercel configuration
│   ├── package.json            # Backend dependencies
│   └── .env.production         # Production environment
├── build.sh                    # Build script
└── src/                        # Angular source code
```

## **🔧 Step-by-Step Deployment**

### **Step 1: Prepare Your Environment**

1. **Install Angular CLI globally:**
   ```bash
   npm install -g @angular/cli
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

### **Step 2: Build the Application**

Run the build script from the project root:
```bash
./build.sh
```

This script will:
- ✅ Install Angular dependencies
- ✅ Build Angular app for production
- ✅ Install backend dependencies
- ✅ Copy Angular build to backend
- ✅ Create production environment file
- ✅ Update package.json scripts

### **Step 3: Configure Environment Variables**

Create a `.env` file in the backend directory:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@biopluslab.com
PORT=3000
NODE_ENV=production
```

### **Step 4: Deploy to Vercel**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add the following variables:
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password
     - `ADMIN_EMAIL`: Admin email for notifications

### **Step 5: Configure Gmail App Password**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

## **🎯 What Gets Deployed**

### **Frontend (Angular)**
- ✅ Production build with optimizations
- ✅ Static files served by Express
- ✅ SPA routing support
- ✅ Environment-specific configuration

### **Backend (Node.js)**
- ✅ API endpoints (`/api/*`)
- ✅ File upload handling
- ✅ Email service with BIOPLUS logo
- ✅ Security validations
- ✅ Error handling

### **Full-Stack Features**
- ✅ Single deployment unit
- ✅ Same-origin requests (no CORS issues)
- ✅ Professional email templates
- ✅ File upload with security restrictions
- ✅ Responsive design

## **🔍 Testing Your Deployment**

### **1. Health Check**
```bash
curl https://your-app.vercel.app/api/health
```

### **2. Services API**
```bash
curl https://your-app.vercel.app/api/services
```

### **3. Frontend Access**
Visit: `https://your-app.vercel.app`

### **4. Test Appointment Booking**
- Open the application
- Fill out the appointment form
- Upload files (optional)
- Submit and check for email notifications

## **📧 Email Configuration**

### **Production Email Setup**
1. **Gmail Configuration:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. **Admin Notifications:**
   ```env
   ADMIN_EMAIL=admin@biopluslab.com
   ```

### **Email Templates**
- ✅ **User Confirmation**: Professional design with BIOPLUS branding
- ✅ **Admin Notification**: Urgent styling with complete details
- ✅ **File Attachments**: Both emails include uploaded files
- ✅ **Logo Integration**: BIOPLUS logo in all emails

## **🛡️ Security Features**

- ✅ **File Upload Security**: Type validation, size limits, executable blocking
- ✅ **Input Validation**: Email format, phone format, comment length
- ✅ **CORS Configuration**: Production-ready origins
- ✅ **Environment Protection**: Sensitive data in environment variables

## **📊 Monitoring & Maintenance**

### **Vercel Dashboard**
- Monitor deployment status
- View function logs
- Check environment variables
- Monitor performance metrics

### **Application Logs**
- API request logging
- Email service status
- Error tracking
- File upload monitoring

## **🔄 Updates & Redeployment**

### **For Code Changes:**
1. Make your changes
2. Run `./build.sh`
3. Deploy with `vercel --prod`

### **For Environment Changes:**
1. Update variables in Vercel dashboard
2. Redeploy if needed

## **🎉 Success Checklist**

- [ ] Angular app builds successfully
- [ ] Backend dependencies installed
- [ ] Angular build copied to backend
- [ ] Environment variables configured
- [ ] Gmail app password generated
- [ ] Deployed to Vercel
- [ ] Health check passes
- [ ] Frontend loads correctly
- [ ] API endpoints working
- [ ] Email notifications working
- [ ] File upload functional

## **🚨 Troubleshooting**

### **Build Issues**
- Ensure Angular CLI is installed globally
- Check Node.js version compatibility
- Verify all dependencies are installed

### **Deployment Issues**
- Check Vercel CLI is installed and logged in
- Verify environment variables are set
- Check Vercel function logs

### **Email Issues**
- Verify Gmail app password is correct
- Check 2FA is enabled on Gmail
- Test email configuration locally first

### **API Issues**
- Check CORS configuration
- Verify environment variables
- Monitor Vercel function logs

---

**🎯 Your BIOPLUS Labs application is now ready for production deployment!**

The full-stack application will be available at your Vercel URL with both frontend and backend functionality integrated seamlessly.
