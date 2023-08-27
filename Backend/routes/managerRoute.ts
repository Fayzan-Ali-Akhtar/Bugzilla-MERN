import express from 'express';
const router = express.Router();
// const authenticateUser = require('../middleware/authentication');
const authenticateUser = require('../middleware/authentication');

import { Request, Response, NextFunction } from 'express';
import {AuthenticatedRequest} from '../Constant'
// Controllers 
const {signup,login,getOneManager,getAllManagers } = require('../controllers/managerController');

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Manager 
router.route('/').get(getOneManager);
// Get All Managers
router.route('/all').get(getAllManagers);

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