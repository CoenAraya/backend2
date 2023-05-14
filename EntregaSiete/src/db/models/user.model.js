import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
    
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const userModel = mongoose.model('Users', usersSchema);