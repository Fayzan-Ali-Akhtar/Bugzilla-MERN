import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens

const BugSchema = new mongoose.Schema({
    title:String,
    deadline:String,
    status: String, 
    type: String,
    // developers: String[],
    developers: [{ type: mongoose.Types.ObjectId, ref: 'Developer' }], // Array of ObjectId
    // Optinal fields
    description: { type: String, default: '' },
    screenshot: { type: String, default: '' },
});

module.exports = mongoose.model('Bug', BugSchema);

// title: string;
//     deadline: string;
//     status: string; 
//     type: string;
//     developers: Developer[];
//     // Optinal fields
//     description?: string;
//     screenshot?: string;