import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens

const ManagerSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide Manager First Name'],
      },
    lastName:{
        type: String,
        required: [true, 'Please provide Manager Last Name'],
      },
    email:{
        type: String,
        required: [true, 'Please provide Manager Email'],
      },
    password:{
        type: String,
        required: [true, 'Please provide Manager Password'],
      },

});

module.exports = mongoose.model('Manager', ManagerSchema);