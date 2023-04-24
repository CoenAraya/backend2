class ProductManager {
  constructor() {
    this.products = [];
    this.lastID = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct({title, description, price, thumbnail, code, stock}) {
    if (this.products.some(product => product.code === code)) {
      throw new Error('El código ya existe');
    }

    const product = {
      id: ++this.lastID,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    return product;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }
}


// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Llamar a getProducts recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts()); // []

// Agregar un producto
const newProduct = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};
productManager.addProduct(newProduct);

// Llamar a getProducts nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts()); // [{id: 1, ...newProduct}]

// Agregar un producto con el mismo código
try {
  productManager.addProduct(newProduct);
} catch (error) {
  console.error(error.message); // 'El código ya existe'
}

// Obtener un producto por ID
const productById = productManager.getProductById(1);
console.log(productById); // {id: 1, ...newProduct}

// Obtener un producto con un ID que no existe
try {
  productManager.getProductById(2);
} catch (error) {
  console.error(error.message); // 'Producto no encontrado'
}
