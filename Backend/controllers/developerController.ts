import { Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model 
const QA = require("../models/QA");
const Manager = require("../models/Manager");
const Developer = require("../models/Developer");

// To get 1 specific developer
export const getOneDeveloper = async (req: Request, res: Response) => {
  try {
    const developerId = req.query.id; // Assuming the route parameter is named 'id'
    console.log(`Finding Developer with id ${developerId}`);
    // Fetch the developer by ID from the database
    const developer = await Developer.findById(developerId);

    if (!developer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Developer not found" });
    }

    res.status(StatusCodes.OK).json({ developer });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching the developer" });
  }
};


// To get all developers
export const getAllDevelopers = async (req: Request, res: Response) => {
  try {
    // Fetch all developers from the database
    const developers = await Developer.find();

    res.status(StatusCodes.OK).json({ developers });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching developers" });
  }
};


// To create a new developer
export const signup = async (req: Request, res: Response) => {
  // Checking if all fields are filled
  const { firstName, lastName, email, password, userType } = req.body;
  if (!firstName || !lastName || !email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
  }

  // Checking if User Request is for Developer
  if (userType !== "developer") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserType is not Developer" });
  }

  // Check if a developer with the provided email already exists
  const existingQA = await QA.findOne({ email });
  const existingManager = await Manager.findOne({ email });
  const existingDeveloper = await Developer.findOne({ email });
  if (existingQA || existingManager || existingDeveloper) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "Email already in use!" });
  }

  // making developer object
  const developerObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  };

  try {
    // Check if a developer with the provided email already exists
    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already exists" });
    }
    const developer = await Developer.create({ ...developerObj });
    const token = developer.createJWT();
    // Not sending back password
    developer.password = "";
    res.status(StatusCodes.CREATED).json({ developer,token });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the developer" });
  }
};


// To login a developer
export const login = async (req: Request, res: Response) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide email, password and userType" });
  } 

  // Checking if User Request is for Developer
  if (userType !== "developer") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserType is not Developer" });
  }


  const developer = await Developer.findOne({ email });
  // Whne developer is not found 
  if (!developer) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  // Checking Password
  const isPasswordCorrect = await developer.comparePassword(password);
  // When Passwor is incorrect or not found
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  const token = developer.createJWT();
  // Not sending back password
  developer.password = "";
  res.status(StatusCodes.OK).json({ developer,token });
};