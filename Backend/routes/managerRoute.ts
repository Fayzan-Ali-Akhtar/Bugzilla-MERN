import express from 'express';
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
// Controllers 
const {signup,login,getOneManager,getAllManagers } = require('../controllers/managerController');

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Manager 
router.route('/').get(authenticateUser,getOneManager);
// Get All Managers
router.route('/all').get(authenticateUser,getAllManagers);

module.exports = router;