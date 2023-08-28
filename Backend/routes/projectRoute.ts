import express from 'express';
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

// Controllers 
const {createProject } = require('../controllers/project/createProject');
const {deleteProject } = require('../controllers/project/deleteProject');
const {add } = require('../controllers/project/add');
const {remove } = require('../controllers/project/remove');
const {all } = require('../controllers/project/all');
const {info } = require('../controllers/project/info');
const {allinfo } = require('../controllers/project/allinfo');

// Create  new Project
router.route('/create').post(authenticateUser,createProject);
// Delete Project
router.route('/delete').delete(authenticateUser,deleteProject);
// Add a Developer or QA 
router.route('/add').post(authenticateUser,add);
// Remove a Developer or QA
router.route('/remove').delete(authenticateUser,remove);
// Get all the projects of a user
router.route('/all').get(authenticateUser,all);
// Get all the projects of a user
router.route('/info').get(authenticateUser,info);
// Get all the projects of a user
router.route('/allinfo').get(authenticateUser,allinfo);

module.exports = router;