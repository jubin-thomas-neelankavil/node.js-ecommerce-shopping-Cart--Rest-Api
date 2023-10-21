import User from '../../models/UserModel.js'; // Update the import path for the User model
import Product from '../../models/ProductModel.js'; // Update the import path for the Product model
import Order from '../../models/OrderModel.js';

const AdminController = {
  getAllUsers: async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  getAllProducts: async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  getAllOrders: async (req, res) => {
    try {
      // Fetch all orders from the database
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  // Add additional admin-related controller methods as needed...
};

export default AdminController;
