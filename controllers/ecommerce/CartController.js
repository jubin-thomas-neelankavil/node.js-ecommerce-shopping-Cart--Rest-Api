import Cart from '../../models/CartModel.js';
import Product from '../../models/ProductModel.js';

const CartController = {
  getUserCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      res.json(cart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  addItemToCart: async (req, res) => {
    const { product_id, quantity } = req.body;
    console.log(req.body);

    try {
      const product = await Product.findById(product_id);
      console.log(product,"pro++");

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      let cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        cart = new Cart({ user: req.user.id, items: [] });
      }

      const existingItem = cart.items.find((item) => item.product.toString() === product_id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: product_id, quantity });
      }

      await cart.save();

      res.json(cart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  updateCartItem: async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
      let cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      const cartItem = cart.items.find((item) => item._id.toString() === itemId);

      if (!cartItem) {
        return res.status(404).json({ msg: 'Cart item not found' });
      }

      cartItem.quantity = quantity;

      await cart.save();

      res.json(cart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  removeItemFromCart: async (req, res) => {
    const { itemId } = req.params;

    try {
      let cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

      await cart.save();

      res.json(cart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  checkoutCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      // Implement order creation logic here and save the order to the database
      // You may want to clear the user's cart after creating an order

      res.json({ msg: 'Cart checked out successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  // Add additional cart-related controller methods as needed...
};

export default CartController;
