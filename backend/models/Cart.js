import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  ProductId: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  ProductImageURL: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  ProductBrand: {
    type: String,
    required: true,
  },
});

const userCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: [cartItemSchema],
});

const UserCart = mongoose.model('UserCart', userCartSchema);

export default UserCart;
