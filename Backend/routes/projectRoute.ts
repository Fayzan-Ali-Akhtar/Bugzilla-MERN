import express from 'express';
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

// import { Request, Response, NextFunction } from 'express';
// import {AuthenticatedRequest} from '../Constant'

// Controllers 
const {createProject,deleteProject,add,remove,all } = require('../controllers/projectController');

// Create  new Project
router.route('/create').post(authenticateUser,createProject);
// Delete Project
router.route('/delete').post(authenticateUser,deleteProject);
// Add a Developer or QA 
router.route('/add').get(authenticateUser,add);
// Remove a Developer or QA
router.route('/remove').get(authenticateUser,remove);
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