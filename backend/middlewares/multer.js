// middlewares/multer.js
import multer from 'multer';
import path from 'path';

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Create a unique filename
    cb(null, fileName);
  }
});

// Set the file filter if needed (optional, can be used to restrict file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'), false); // Reject the file
  }
};

// Create multer instance with the storage and file filter options
export const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Max file size 10MB (optional)
});
