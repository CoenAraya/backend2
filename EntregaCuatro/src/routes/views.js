//Ruta de Productos************
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaViews = express.Router();

const views = new Contenedor('./src/db/productos.JSON');

// Acceso como administrador

rutaViews.use 

rutaViews.get('/', async (peticion, respuesta) => {
    const listaProductos = await views.getAll();
    console.log(listaProductos)
    respuesta.render('home', { listaProductos });
});

rutaViews.get('/realtimeproducts', async (req, respuesta) => {
    const products = await views.getAll();
    console.log(products)
    respuesta.render('realTimeProducts', { products });
});

export default rutaViews