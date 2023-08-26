import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'; // for hashing passwords
// import jwt from 'jsonwebtoken'; // for generating tokens

const TaskSchema = new mongoose.Schema({
    name:String,
    completed:Boolean
});

module.exports = mongoose.model('Task', TaskSchema);