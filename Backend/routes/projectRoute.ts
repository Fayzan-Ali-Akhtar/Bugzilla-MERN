import express from 'express';
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

// import { Request, Response, NextFunction } from 'express';
// import {AuthenticatedRequest} from '../Constant'

// Controllers 
// const {all } = require('../controllers/projectController');
const {createProject } = require('../controllers/project/createProject');
const {deleteProject } = require('../controllers/project/deleteProject');
const {add } = require('../controllers/project/add');
const {remove } = require('../controllers/project/remove');
const {all } = require('../controllers/project/all');

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

// Testing authenticateUser 
router.route('/test').get(authenticateUser, (req: any, res: any) => {
    // res.send("Test Successful");
    res.send({
        email : req.user.email,
        userType : req.user.userType,
        id: req.user.userId
    });
});

module.exports = router;