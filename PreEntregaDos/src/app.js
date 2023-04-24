import express from 'express';
import { __dirname } from '../src/utils.js';
import handlebars from 'express-handlebars';
import './db/dbConfig.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import ProductManager from '../src/Dao/ProductManagerMongo.js';

const path = __dirname + '/productosAgregar.json';
const productManager = new ProductManager(path);


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configurando o servidor para apresentar arquivos estáticos

app.use(express.static(__dirname + '/public'))

// configurando a template engine

app.engine('handlebars', handlebars.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Routes
app.use('/views', viewsRouter);
app.use('/products', productsRouter)


//Configuro el SocketServer

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Listen in port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Client conected id: ${socket.id}`);
  
    socket.on('disconnect', () => {
      console.log(`Client disconected id: ${socket.id}`);
    });
  
    socket.on('addNewProduct', async (product) => {
      await productManager.addProducts(product);
    });
  
    socket.on('deleteProduct', (id) => {
      console.log(`Product deleted ${id}`);
      productManager.deleteProductsById(id);
    });
  
    socket.on('message', (info) => {
      messages.push(info);
      socketServer.emit('chat', messages);
    });
  
    socket.on('newUser', (newUser) => {
      socket.broadcast.emit('broadcastChat', newUser);
      socketServer.emit('chat', messages);
    });
  });