import express from 'express';
const router = express.Router();


import UserCart from '../models/Cart.js';

// Add a product to the user's cart
router.post('/product/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const newItem = req.body;
    console.log(newItem);

    const userCart = await UserCart.findOne({ userId });

    if (userCart) {
      // If the user already has a cart, add the item to the existing cart
      const existingProductIndex   = userCart.cartItems.findIndex((i)=> i.ProductId===newItem.ProductId);
      if (existingProductIndex!==-1){
        userCart.cartItems[existingProductIndex].Quantity += newItem.Quantity;
      } else{
        userCart.cartItems.push(newItem);
        await userCart.save();
      }
      
    } else {
      // If the user doesn't have a cart, create a new cart and add the item
      await UserCart.create({ userId, cartItems: [newItem] });
    }

    res.status(201).json({ message: 'Product added to cart successfully!' });
  } catch (error) {
    console.error('Error adding product to cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user's cart items
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found for the user' });
    }

    res.json(userCart.cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id/:userId', async (req, res) => {
  try {
      const { id, userId } = req.params;
      const cart = await UserCart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      const productIndex = cart.cartItems.findIndex(item => item.ProductId == id);
      if (productIndex === -1) {
          return res.status(404).json({ message: 'No such product in this cart.' });
      }

      cart.cartItems.splice(productIndex, 1);
              await cart.save();

      res.json({ message: 'Product id deleted' });
  } catch (error) {
      console.log("Error removing product from cart", error);
      res.status(500).json({ error: "Server Error" });
  }
});

export default router;
