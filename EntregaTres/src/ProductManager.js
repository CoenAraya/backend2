const fs = require('fs/promises');

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts(); // Cargar los productos del archivo al instanciar la clase
  }

  async loadProducts() {
    try {
      const data = await fs.readFile('products.json', 'utf-8'); // Leer el archivo de productos
      const products = JSON.parse(data); // Convertir el contenido a un objeto JS
      this.products = products; // Asignar los productos a la propiedad products de la clase
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit); // Devolver sólo el número de productos especificado por el límite
    } else {
      return this.products; // Devolver todos los productos
    }
  }

  async getProductById(productId) {
    return this.products.find(product => product.id === productId); // Buscar y devolver el producto con el ID especificado
  }
}

module.exports = ProductManager;
