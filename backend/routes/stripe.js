import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_KEY);
dotenv.config();

router.post('/create-checkout-session', async (req, res) => {
  // console.log(req.body);
  try {
    if (!req.body.cartItems || !Array.isArray(req.body.cartItems)) {
      throw new Error('Invalid cartItems provided');
    }

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: JSON.stringify(req.body.cartItems).substring(0, 500),
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.ProductName,
            images: [item.ProductImageURL],
            description:item.ProductBrand
          },
          unit_amount: item.ProductPrice * 100, 
        },
        quantity: item.Quantity,
      };
    });    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },    
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default router;
