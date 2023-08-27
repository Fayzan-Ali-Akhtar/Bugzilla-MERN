import express from 'express';
const router = express.Router()
// Controllers 
const {signup,login,getOneQA,getAllQAs } = require('../controllers/qaController')

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific QA 
router.route('/').get(getOneQA);
// Get All QAs
router.route('/all').get(getAllQAs);

module.exports = router;