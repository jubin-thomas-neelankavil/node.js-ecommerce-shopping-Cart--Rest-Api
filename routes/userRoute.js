

import express from 'express';
import UserController from '../controllers/ecommerce/UserController.js';
import authMiddleware from '../middlewares/auth-middleware.js'
const router = express.Router();

// Define your user routes here
router.get('/profile',authMiddleware, UserController.getUserProfile);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.put('/update',authMiddleware, UserController.updateUserProfile);

export default router;
