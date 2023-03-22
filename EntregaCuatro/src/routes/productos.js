//Ruta de Productos************
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaProducto = express.Router();

const productos = new Contenedor('./src/db/productos.JSON');

// Acceso como administrador

rutaProducto.use 

//Endpoints

rutaProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await productos.getAll();
  console.log(listaProductos)
  respuesta.json(listaProductos);
});

rutaProducto.get('/:id', async (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
    const datita = await productos.getById(id);
    respuesta.json(datita);
});

rutaProducto.post('/', async (peticion, respuesta) => {
  const unProducto =  peticion.body;
  const listaProductos = await productos.save(unProducto)
  
});

rutaProducto.put('/:pid', async (peticion, respuesta) => {
  const id = parseInt(peticion.params.pid);
  const unProducto =  peticion.body;
  const actualizarProducto = await productos.update(unProducto, id)
  
});

rutaProducto.delete('/:pid', async (peticion, respuesta) => {
  const id = parseInt(peticion.params.pid);
  const productoBorrado = await productos.deleteById(id)

});

export default  rutaProducto