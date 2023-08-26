// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard
import { Request, Response } from 'express';
const { StatusCodes } = require('http-status-codes')

const Manager = require('../models/Manager');

const jwt = require('jsonwebtoken')

export const getOneManager = async (req: Request, res: Response) => {
    try {
        const managerId = req.query.id; // Assuming the route parameter is named 'id'
        console.log(`Finding Manager with id ${managerId}`);
        // Fetch the manager by ID from the database
        const manager = await Manager.findById(managerId);
    
        if (!manager) {
          return res.status(StatusCodes.NOT_FOUND).json({ error: 'Manager not found' });
        }
    
        res.status(StatusCodes.OK).json({ manager });
      } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching the manager' });
      }
    
}

export const getAllManagers = async (req: Request, res: Response) => {
    try {
        // Fetch all managers from the database
        const managers = await Manager.find();
    
        res.status(StatusCodes.OK).json({ managers });
      } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching managers' });
      }
}

export const signup = async (req: Request, res: Response) => {
    console.log("Signup!");
    console.log(req.body);

    // Checking if all fields are filled 
    const { firstName, lastName, email, password,userType } = req.body;
    if (!firstName || !lastName || !email || !password || !userType) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing required fields' });
    }

    // Checking if User Request is for Manager
    if(userType !== 'manager'){
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'UserType is not Manager' });
    }
    
    // Check if a manager with the provided email already exists
        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'Email already in use!' });
        }

    // making manager object 
    const managerObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
    }
    try {
      
      
      // Check if a manager with the provided email already exists
        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'Email already exists' });
        }  const manager = await Manager.create({ ...managerObj });
        const token = manager.createJWT();
        // Not sending back password 
    manager.password = "";
    manager.token = token;
        res.status(StatusCodes.CREATED).json({manager});
      } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the manager' });
      }

}


export const login = async (req: Request, res: Response) => {
    const { email, password,userType } = req.body;
    console.log(req.body);
  
    if (!email || !password || !userType) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email, password and userType'});
    }
    const manager = await Manager.findOne({ email });
    console.log("manager found: ",manager);
    if (!manager) {
        console.log("yo1");
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Invalid Credentials'});
    }
    const isPasswordCorrect = await manager.comparePassword(password);
    if (!isPasswordCorrect) {
        console.log("yo2");
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Invalid Credentials'});
    }
    // compare password
    const token = manager.createJWT();
    // Not sending back password 
    manager.password = "";
    manager.token = token;
    res.status(StatusCodes.OK).json({ manager });
  }