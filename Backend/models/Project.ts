import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating tokens

const ProjectSchema = new mongoose.Schema({
    title: String,
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }],
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }],
    qas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QA' }],
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }],
});

module.exports = mongoose.model('Project', ProjectSchema);

