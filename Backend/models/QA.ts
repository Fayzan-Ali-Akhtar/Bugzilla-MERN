import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens

const QASchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide QA First Name'],
      },
    lastName:{
        type: String,
        required: [true, 'Please provide QA Last Name'],
      },
    email:{
        type: String,
        required: [true, 'Please provide QA Email'],
      },
    password:{
        type: String,
        required: [true, 'Please provide QA Password'],
      },
      userType:{type: String,
        required: [true, 'Please provide User Type'],
        default: 'qa',
      },
});

module.exports = mongoose.model('QA', QASchema);