import multer from 'multer';
import path from 'path';
import os from 'os';

// Allowed file types (non-executable)
const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/rtf'
];

// Blocked file extensions (executable files)
const blockedExtensions = [
  '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
  '.app', '.deb', '.dmg', '.pkg', '.rpm', '.msi', '.run', '.sh', '.ps1',
  '.php', '.py', '.rb', '.pl', '.cgi', '.asp', '.aspx', '.jsp'
];

// File size limit (5MB)
const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

// Configure multer for file uploads - use system temp directory for Vercel
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use system temp directory for Vercel compatibility
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  // Check if file extension is blocked
  if (blockedExtensions.includes(fileExtension)) {
    return cb(new Error(`File type ${fileExtension} is not allowed for security reasons.`), false);
  }
  
  // Check if MIME type is allowed
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed.`), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxFileSize,
    files: 3 // Maximum 3 files per request
  }
});

export { upload, maxFileSize, allowedMimeTypes, blockedExtensions };
