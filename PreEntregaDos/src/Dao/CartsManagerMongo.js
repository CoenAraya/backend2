import { cartModel } from '../db/models/carts.model.js';

class CartManager {
  getCartById = async (id) => {
    try {
      const cart = await cartModel.find({ _id: id });
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  addCarts = async () => {
    try {
      const newCarts = await cartModel.create({ products: [] });
      return newCarts;
    } catch (error) {
      console.log(error);
    }
  };

  addProductsToCart = async (cid, pid) => {
    const cart = await this.getCartById(cid);
    let q = 1;
    const obj = { product: pid, quantity: q };
    if (!cart) {
      return "Cart doesn't exist";
    } else {
      const product = cart.products.find((p) => p.product === pid);
      console.log(product);

      if (!product) {
        console.log('Carrito vacio');
        //     cart.products.push(obj);
        //     //agregar funcion
        //     return 'Product in cart';
      } else {
        console.log('Carrito lleno');
        //     const obj = product.quantity++;
        //     await cartModel.findOneAndUpdate({ _id: cid }, obj);
        //     return 'Product in cart';
      }
    }
  };
}

export default CartManager;
