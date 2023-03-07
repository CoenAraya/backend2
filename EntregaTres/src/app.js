const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    if (!Number.isNaN(limit) && limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await productManager.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});