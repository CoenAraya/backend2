import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
  products: [{ product: Number, quantity: Number }],
});

export const cartModel = mongoose.model('Carts', cartsSchema);