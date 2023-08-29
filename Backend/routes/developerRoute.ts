import express from 'express';
const router = express.Router()
// Middleware 
const authenticateUser = require('../middleware/authentication');
// Controllers 
const {signup,login,getOneDeveloper,getAllDevelopers } = require('../controllers/developerController')

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Developer 
router.route('/').get(authenticateUser,getOneDeveloper);
// Get All Developers
router.route('/all').get(authenticateUser,getAllDevelopers);

module.exports = router;