import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
});

export const userModel = mongoose.model('Users', usersSchema);