import express from 'express';
import { registerUser, loginUser, gettingUserData, updateUserData } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile route
router.get('/get-profile', authUser, gettingUserData);

// Update user profile route
router.post('/update-profile', authUser, upload.single('image'), updateUserData);

export default router;