
import  Order  from '../../models/OrderModel.js';
import Cart from '../../models/CartModel.js'; // Updated import path

// Your controller functions...


export const getUserOrders = async (req, res) => {
  try {
    // Fetch the user's orders from the database
    const orders = await Order.find({ user: req.user.id });

    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch the order by ID from the database
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const createOrder = async (req, res) => {
  try {
    // Fetch the user's cart from the database
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Calculate the total price of the order based on the cart items
    let total = 0;
    for (const item of cart.items) {
      total += item.quantity * item.product.price;
    }

    // Create a new order document
    const order = new Order({
      user: req.user.id, // Assuming you have the user's ID in req.user
      items: cart.items,
      total,
      status: 'Pending', // Set an initial order status
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.json({ msg: 'Order created successfully', order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order by ID and update its status to "canceled"
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'canceled' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const trackOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch the order by ID from the database
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order.status); // Return the order status
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

// Add additional order-related controller methods as needed...
