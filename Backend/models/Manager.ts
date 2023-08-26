import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'; // for hashing passwords
// import jwt from 'jsonwebtoken'; // for generating tokens

export const ManagerSchema = new mongoose.Schema({
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
      userType:{type: String,
        required: [true, 'Please provide User Type'],
        default: 'manager',
      },

});

module.exports = mongoose.model('Manager', ManagerSchema);