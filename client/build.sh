#!/bin/bash

# Build script for BIOPLUS Labs Full-Stack Application
# This script builds the Angular frontend and prepares it for deployment

echo "🚀 Starting BIOPLUS Labs build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing Angular dependencies..."
if npm install; then
    print_status "Angular dependencies installed successfully"
else
    print_error "Failed to install Angular dependencies"
    exit 1
fi

# Step 2: Build Angular application
print_status "Building Angular application for production..."
if ng build --configuration=production; then
    print_status "Angular build completed successfully"
else
    print_error "Angular build failed"
    exit 1
fi

# Step 3: Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
if npm install; then
    print_status "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Step 4: Copy Angular build to backend
print_status "Copying Angular build to backend..."
cd ..
if [ -d "dist/bioplus" ]; then
    # Remove existing build
    rm -rf backend/dist
    # Copy new build
    cp -r dist backend/
    print_status "Angular build copied to backend successfully"
else
    print_error "Angular build directory not found"
    exit 1
fi

# Step 5: Create production environment file
print_status "Creating production environment file..."
cat > backend/.env.production << EOF
# Production Environment Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=\${EMAIL_USER}
EMAIL_PASS=\${EMAIL_PASS}
ADMIN_EMAIL=\${ADMIN_EMAIL}
PORT=3000
NODE_ENV=production
EOF

print_status "Production environment file created"

# Step 6: Update package.json scripts
print_status "Updating package.json scripts..."
cd backend
# Add production start script
if ! grep -q '"start:prod"' package.json; then
    # Use sed to add the start:prod script
    sed -i.bak 's/"start": "node server.js"/"start": "node server.js",\n    "start:prod": "node server.prod.js"/' package.json
    print_status "Added start:prod script to package.json"
fi

cd ..

print_status "Build process completed successfully! 🎉"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in your deployment platform"
echo "2. Deploy the backend folder to Vercel"
echo "3. Your full-stack application will be available at your Vercel URL"
echo ""
echo "🔧 Environment variables needed:"
echo "   - EMAIL_USER: Your Gmail address"
echo "   - EMAIL_PASS: Your Gmail app password"
echo "   - ADMIN_EMAIL: Admin email for notifications"
echo ""
print_warning "Make sure to update the production environment file with your actual email credentials!"
