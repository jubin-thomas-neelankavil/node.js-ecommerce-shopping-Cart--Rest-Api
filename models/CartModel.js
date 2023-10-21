import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [cartItemSchema],
  // Add more cart-specific fields here as needed
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart; // Export the Cart model as the default export
