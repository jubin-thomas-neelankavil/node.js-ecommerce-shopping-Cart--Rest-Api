import express from 'express';
import AdminController from '.././controllers/ecommerce/AdminController.js';

const router = express.Router();

// Define your admin-only routes here
router.get('/users', AdminController.getAllUsers);
router.get('/products', AdminController.getAllProducts);
router.get('/orders', AdminController.getAllOrders);

export default router; // Export the router as the default export
