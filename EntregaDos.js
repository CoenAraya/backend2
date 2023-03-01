class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      const id = ++this.lastId;
      const newProduct = { id, ...product };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Producto con el id ${id} no encontrado`);
      }
      return product;
    }
  
    updateProduct(id, updates) {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Producto con el id ${id} no encontrado`);
      }
      this.products[productIndex] = { ...this.products[productIndex], ...updates };
      return this.products[productIndex];
    }
  
    deleteProduct(id) {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Producto con el id ${id} no encontrado`);
      }
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      return deletedProduct;
    }
  }
  
  const productManager = new ProductManager();
  
  // Verificar que getProducts devuelva un arreglo vacío
  console.log(productManager.getProducts()); // []
  
  // Agregar un nuevo producto
  const newProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };
  
  const addedProduct = productManager.addProduct(newProduct);
  console.log(addedProduct); 
  
  // Verificar que getProducts ahora devuelva el producto agregado
  console.log(productManager.getProducts()); 
  
  // Obtener un producto por su id
  const productById = productManager.getProductById(1);
  console.log(productById); 
  
  // Actualizar un producto
  const updatedProduct = productManager.updateProduct(1, { price: 250 });
  console.log(updatedProduct);

  // Eliminar un producto
  const deletedProduct = productManager.deleteProduct(1);
  console.log(deletedProduct); 