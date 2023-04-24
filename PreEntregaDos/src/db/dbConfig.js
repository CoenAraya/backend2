import mongoose from 'mongoose';

const URI ='mongodb+srv://coenarayadb:36988918@cluster0.nm97j5n.mongodb.net/mongoose1DB?retryWrites=true&w=majority'

mongoose
.connect(URI)
.then(() => console.log('DB is connected'))
.catch(err => console.log(err))