import { Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model 
const QA = require("../models/QA");

// To get 1 specific qa
export const getOneQA = async (req: Request, res: Response) => {
  try {
    const qaId = req.query.id; // Assuming the route parameter is named 'id'
    console.log(`Finding QA with id ${qaId}`);
    // Fetch the qa by ID from the database
    const qa = await QA.findById(qaId);

    if (!qa) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "QA not found" });
    }

    res.status(StatusCodes.OK).json({ qa });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching the QA" });
  }
};


// To get all qas
export const getAllQAs = async (req: Request, res: Response) => {
  try {
    // Fetch all qas from the database
    const qas = await QA.find();

    res.status(StatusCodes.OK).json({ qas });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching qas" });
  }
};


// To create a new qa
export const signup = async (req: Request, res: Response) => {
  // Checking if all fields are filled
  const { firstName, lastName, email, password, userType } = req.body;
  if (!firstName || !lastName || !email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
  }

  // Checking if User Request is for QA
  if (userType !== "qa") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserType is not qa" });
  }

  // Check if a QA with the provided email already exists
  const existingQA = await QA.findOne({ email });
  if (existingQA) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "Email already in use!" });
  }

  // making qa object
  const qaObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  };

  try {
    // Check if a qa with the provided email already exists
    const existingQA = await QA.findOne({ email });
    if (existingQA) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already exists" });
    }
    const qa = await QA.create({ ...qaObj });
    const token = qa.createJWT();
    // Not sending back password
    qa.password = "";
    qa.token = token;
    res.status(StatusCodes.CREATED).json({ qa });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the qa" });
  }
};


// To login a qa
export const login = async (req: Request, res: Response) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide email, password and userType" });
  }

  const qa = await QA.findOne({ email });
  // Whne qa is not found 
  if (!qa) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  // Checking Password
  const isPasswordCorrect = await qa.comparePassword(password);
  // When Passwor is incorrect or not found
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid Credentials" });
  }

  const token = qa.createJWT();
  // Not sending back password
  qa.password = "";
  qa.token = token;
  res.status(StatusCodes.OK).json({ qa });
};