import express from 'express';
const router = express.Router();
import * as ProductController from '../controllers/ecommerce/ProductController.js';

// Define your product routes here
router.get('/products', ProductController.getProducts);
router.get('/:productId', ProductController.getProductById);
router.post('/create', ProductController.createProduct);
router.put('/:productId/update', ProductController.updateProduct);
router.delete('/:productId/delete', ProductController.deleteProduct);

export default router; // Export the router as the default export
