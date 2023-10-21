import Product from '../../models/ProductModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const createProduct = async (req, res) => {
  const { name, price, description, image_url } = req.body;

  try {
    // Create a new product
    const product = new Product({
      name,
      price,
      description,
      image_url,
    });

    // Save the product to the database
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, description, image_url } = req.body;

  try {
    // Find the product by ID and update its fields
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image_url = image_url;

    // Save the updated product
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product by ID and delete it
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

// Add additional product-related controller methods as needed...
