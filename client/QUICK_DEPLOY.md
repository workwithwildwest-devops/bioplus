# BIOPLUS Labs - Quick Deployment Guide

## 🚀 **Simple Deployment Steps**

### **Step 1: Build Angular App**
```bash
# From project root
npm run build:prod
```

### **Step 2: Copy Build to Backend**
```bash
# Copy Angular build to backend
cp -r dist/bioplus backend/dist
```

### **Step 3: Install Backend Dependencies**
```bash
cd backend
npm install
```

### **Step 4: Create Environment File**
Create `backend/.env` with your email settings:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@biopluslab.com
PORT=3000
NODE_ENV=production
```

### **Step 5: Deploy to Vercel**
```bash
# From backend directory
vercel --prod
```

### **Step 6: Set Environment Variables in Vercel**
In your Vercel dashboard:
- Go to Settings → Environment Variables
- Add: `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL`

## **🎯 What You Get**

✅ **Full-stack application** at your Vercel URL  
✅ **Angular frontend** with appointment booking  
✅ **Node.js backend** with email notifications  
✅ **File upload** with security restrictions  
✅ **Professional email templates** with BIOPLUS logo  

## **📧 Gmail Setup**

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS`

## **🔍 Test Your Deployment**

- **Frontend**: Visit your Vercel URL
- **API Health**: `https://your-app.vercel.app/api/health`
- **Book Appointment**: Use the form and check emails

Your BIOPLUS Labs application is now live! 🎉
