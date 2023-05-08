import { Router } from 'express';
import ProductManager from '../Dao/ProductManagerMongo.js';
import { __dirname } from '../utils.js';

const path = __dirname + '/productosAgregar.json';

const router = Router();

const productManager = new ProductManager(path);

router.get('/', async (req, res) => {
  if (req.session.username) {

    console.log(req.session);
    try {
      const products = await productManager.getProducts(100, 0, undefined, undefined, undefined, true);
      
      res.render('home', { products: products.docs, username: req.session.username });
    } catch (error) {
      console.log(error);
      res.status(500).json('product search error');
    }
  }else{
    res.redirect('/login');
  }
});

  router.get("/products", async (req, res) => {
    if (req.session.username) {
    const { limit = 10, page = 0 } = req.query;
    const products = await productManager.getProducts(
      limit,
      page,
      undefined,
      undefined,
      undefined,
      true
    );
    res.render("products", {
      products: products.docs,
      nextPage: products.nextPage,
      prevPage: products.prevPage,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
    });
    }else{
      res.redirect('/login');
    }
  });



  export default router;
