import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens

const DeveloperSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide Developer First Name'],
      },
    lastName:{
        type: String,
        required: [true, 'Please provide Developer Last Name'],
      },
    email:{
        type: String,
        required: [true, 'Please provide Developer Email'],
      },
    password:{
        type: String,
        required: [true, 'Please provide Developer Password'],
      },
});

module.exports = mongoose.model('Developer', DeveloperSchema);