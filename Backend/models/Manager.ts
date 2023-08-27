import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens
require('dotenv').config();

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
      userType:{type: String,
        required: [true, 'Please provide User Type'],
        default: 'manager',
      },
      // Unique ID for each manager
});

// This Function automatically runs before saving the manager object in the database
ManagerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password || '', salt);
  }
  // Going to next Middleware 
  next();
});

// This function gives JWT token for the manager
ManagerSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

// This Function is used to check passwords during Log In
ManagerSchema.methods.comparePassword = async function (passwordFromUser:string) {
  const isMatch = await bcrypt.compare(passwordFromUser, this.password);
  return isMatch;
}

module.exports = mongoose.model('Manager', ManagerSchema);