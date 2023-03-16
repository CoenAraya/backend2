import * as fs from 'fs';

export class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(objeto) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let id = 1;
    archivoParseado.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    archivoParseado.push(objeto);
    await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    return id;
  }
  async update(objeto, id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    const productoEncontrado = archivoParseado.find(producto => producto.id === id);
    if (!productoEncontrado) {
      respuesta.status(404).json({ error: 'Producto no encontrado' });
    } else {
      const updatedProduct = {
        id: id,
        title: objeto.title,
        description: objeto.description,
        code: objeto.code,
        price: objeto.price,
        status: objeto.status,
        stock:  objeto.stock,
        category: objeto.category,
        thumbnails: objeto.thumbnails,
      };
      const index = archivoParseado.indexOf(productoEncontrado);
      archivoParseado.splice(index, 1,updatedProduct);
      await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
      return "ok"
  }
  }
  async getById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let objetoSeleccionado = null;
    archivoParseado.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  async getAll() {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    return archivoParseado;
  }

  async deleteById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let indexSeleccionado = -1;
    archivoParseado.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      archivoParseado.splice(indexSeleccionado, 1);
      await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    }
    
  }

  async deleteAll() {
    const arregloVacio = [];
    await fs.promises.writeFile(this.nombre, JSON.stringify(arregloVacio, null, 2));
  }
}