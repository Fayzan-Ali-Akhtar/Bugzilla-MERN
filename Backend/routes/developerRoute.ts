import express from 'express';
const router = express.Router()
// Controllers 
const {signup,login,getOneDeveloper,getAllDevelopers } = require('../controllers/developerController')

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Developer 
router.route('/').get(getOneDeveloper);
// Get All Developers
router.route('/all').get(getAllDevelopers);

module.exports = router;