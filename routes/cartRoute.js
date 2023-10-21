import express from 'express';
const router = express.Router();
import  CartController  from '../controllers/ecommerce/CartController.js';
import authMiddleware from '../middlewares/auth-middleware.js'

// Cart routes
router.get('/api/cart',authMiddleware, CartController.getUserCart);
router.post('/api/cart/add-item',authMiddleware, CartController.addItemToCart);
router.put('/api/cart/update-item/:itemId',authMiddleware, CartController.updateCartItem);
router.delete('/api/cart/remove-item/:itemId',authMiddleware, CartController.removeItemFromCart);
router.post('/api/cart/checkout',authMiddleware, CartController.checkoutCart);

export { router };
