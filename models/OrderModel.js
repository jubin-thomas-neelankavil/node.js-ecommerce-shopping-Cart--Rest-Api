import mongoose from 'mongoose';
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // You can add more order statuses as needed
  },
  // Add more order-specific fields here as needed
});

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;


// OrderModel.js
export default mongoose.model('Order', orderSchema);

// Export any other named entities you need

