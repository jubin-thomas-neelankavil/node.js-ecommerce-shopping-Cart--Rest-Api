import express from 'express';
const router = express.Router();
import * as OrderController from '../controllers/ecommerce/OrderController.js';
import authMiddleware from '../middlewares/auth-middleware.js'


// Define your order routes here
router.get('/getUserOrders',authMiddleware, OrderController.getUserOrders);
router.get('/getUserOrder/:orderId', OrderController.getOrderById);
router.post('/createOrder',authMiddleware, OrderController.createOrder);
router.post('/:orderId/cancel', OrderController.cancelOrder);
router.get('/:orderId/track', OrderController.trackOrder);

export default router; // Export the router as the default export
