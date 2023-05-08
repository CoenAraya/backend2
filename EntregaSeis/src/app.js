import express from 'express';
import { __dirname } from '../src/utils.js';
import handlebars from 'express-handlebars';
import './db/dbConfig.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import loginRouter from './routes/login.router.js'
import { Server } from 'socket.io';
import ProductManager from '../src/Dao/ProductManagerMongo.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import './passport/passportStrategies.js';

const path = __dirname + '/productosAgregar.json';
const productManager = new ProductManager(path);


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configurando o servidor para apresentar arquivos estáticos

app.use(express.static(__dirname + '/public'))

// configurando a template engine

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//configurando las cookies
app.use(cookieParser());

// configurando la session
const URI ='mongodb+srv://coenarayadb:36988918@cluster0.nm97j5n.mongodb.net/mongoose1DB?retryWrites=true&w=majority';
app.use(
  session({
    store: new mongoStore({
      mongoUrl: URI,
    }),
    secret: 'secretSession',
    cookie: {
      maxAge: 120000,
    },
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/views', viewsRouter);
app.use('/products', productsRouter)
app.use('/login', loginRouter)


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