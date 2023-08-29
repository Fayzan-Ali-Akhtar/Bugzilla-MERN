import express from 'express';
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

// Controllers 
const {createBug } = require('../controllers/bug/createBug');
const {deleteBug } = require('../controllers/bug/deleteBug');
const {addDeveloper } = require('../controllers/bug/addDeveloper');
const {removeDeveloper } = require('../controllers/bug/removeDeveloper');
const {updateStatus } = require('../controllers/bug/updateStatus');
const {info } = require('../controllers/bug/info');

// Create  new Bug
router.route('/create').post(authenticateUser,createBug);
// Delete Bug
router.route('/delete').post(authenticateUser,deleteBug);
// Add a Developer
router.route('/add/developer').post(authenticateUser,addDeveloper);
// Remove a Developer
router.route('/remove').post(authenticateUser,removeDeveloper);
// Developer can update the status of a bug
router.route('/update/status').post(authenticateUser,updateStatus);
// All the users in the project can view bugs
router.route('/info').get(authenticateUser,info);

module.exports = router;