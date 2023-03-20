//Ruta de Productos************
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaCarrito = express.Router();

const carritos = new Contenedor('./db/carritos.JSON');

//Endpoints***

rutaCarrito.get('/', async (peticion, respuesta) => {
  const listaCarritos = await carritos.getAll();
  respuesta.json(listaCarritos);
});

rutaCarrito.delete('/:pid', (peticion, respuesta) => {
  const id = parseInt(peticion.params.pid);
  const carrito = carritos.deleteById(id);
  respuesta.json('Carrito eliminado !')
});

rutaCarrito.get('/:cid/productos', async (peticion, respuesta) => {
  const id = parseInt(peticion.params.cid);
  const productos = await carritos.getProductsCarrito(id);
  if(!productos){
    respuesta.json({error: 'carrito sin productos'})
  }else{
  respuesta.json(productos)
  }
});

rutaCarrito.post('/:cid/productos/:pid', async(peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.cid);
  const idProducto = parseInt(peticion.params.pid);
  const cartCreate = await carritos.addToCart(idCarrito, idProducto)
  respuesta.json(cartCreate);
});



export { rutaCarrito };