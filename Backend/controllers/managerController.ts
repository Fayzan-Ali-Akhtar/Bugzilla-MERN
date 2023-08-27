import { Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model 
const Manager = require("../models/Manager");

// To get 1 specific manager
export const getOneManager = async (req: Request, res: Response) => {
  try {
    const managerId = req.query.id; // Assuming the route parameter is named 'id'
    console.log(`Finding Manager with id ${managerId}`);
    // Fetch the manager by ID from the database
    const manager = await Manager.findById(managerId);

    if (!manager) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Manager not found" });
    }

    res.status(StatusCodes.OK).json({ manager });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching the manager" });
  }
};


// To get all managers
export const getAllManagers = async (req: Request, res: Response) => {
  try {
    // Fetch all managers from the database
    const managers = await Manager.find();

    res.status(StatusCodes.OK).json({ managers });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching managers" });
  }
};


// To create a new manager
export const signup = async (req: Request, res: Response) => {
  // Checking if all fields are filled
  const { firstName, lastName, email, password, userType } = req.body;
  if (!firstName || !lastName || !email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
  }

  // Checking if User Request is for Manager
  if (userType !== "manager") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserType is not manager" });
  }

  // Check if a manager with the provided email already exists
  const existingManager = await Manager.findOne({ email });
  if (existingManager) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "Email already in use!" });
  }

  // making manager object
  const managerObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  };

  try {
    // Check if a manager with the provided email already exists
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already exists" });
    }
    const manager = await Manager.create({ ...managerObj });
    const token = manager.createJWT();
    // Not sending back password
    manager.password = "";
    manager.token = token;
    res.status(StatusCodes.CREATED).json({ manager });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the manager" });
  }
};


// To login a manager
export const login = async (req: Request, res: Response) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide email, password and userType" });
  }

  const manager = await Manager.findOne({ email });
  // Whne manager is not found 
  if (!manager) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  // Checking Password
  const isPasswordCorrect = await manager.comparePassword(password);
  // When Passwor is incorrect or not found
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  const token = manager.createJWT();
  // Not sending back password
  manager.password = "";
  manager.token = token;
  res.status(StatusCodes.OK).json({ manager });
};