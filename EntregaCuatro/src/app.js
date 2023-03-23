import express from 'express'
import { __dirname } from './utils/dirname.js'
import handlebars from 'express-handlebars'
import rutaViews from './routes/views.js'
import rutaCarrito from './routes/carrito.js'
import rutaProducto from './routes/productos.js'
import { Server } from 'socket.io';
import { Contenedor } from './contenedor/contenedorFs.js';
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'))

// configuracion motor de plantilla HANDLEBARS

app.engine('handlebars', handlebars.engine()) // solo para handlebars o un motor propio

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/views', rutaViews)
app.use('/productos', rutaProducto)
app.use('/carrito', rutaCarrito)

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

const productos = new Contenedor('./src/db/productos.JSON');

// inicializar el socket.io con el servidor http
const io = new Server(httpServer);
io.on('connection',  (socket) => {
    
    socket.on('createProduct', async (data) => {
    const arrayProductos = await productos.getAll();
    const productoAgregar = arrayProductos
    productoAgregar.push(data);
    io.emit('product-list', productoAgregar);
    console.log(productoAgregar)
    console.log(data)
    socket.broadcast.emit('message3', `El cliente con id: ${socket.id} ha creado un producto nuevo`);
    
    await productos.save(data)
    })

    socket.on('deleteProduct', async (id) => {

    const arrayProductos = await productos.getAll();
    const productosBorrado = arrayProductos.filter((product) => product.id !== id);
    io.emit('product-list', productosBorrado);
    socket.broadcast.emit('message4', `El cliente con id: ${socket.id} ha borrado un producto`);
    await productos.deleteById(id)
    })



})
