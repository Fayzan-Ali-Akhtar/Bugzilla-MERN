import { Request, Response } from "express";
import { AuthenticatedRequest } from "../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
// const QA = require("../models/QA");
// const Manager = require("../models/Manager");
// const Developer = require("../models/Developer");
const Project = require("../models/Project");
const Bug = require("../models/Bug");

// Making new Project
export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Checking if User Request is for Manager
    if (req.user.userType !== "manager") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is not a manager" });
    }

    // Checking for Title
    if (
      req.body.title === undefined ||
      req.body.title === null ||
      req.body.title === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Title is missing" });
    }

    const titleOFProject = req.body.title;
    const managerOFProject = req.user.userId;

    // Checking if a project with the provided title already exists
    const existingTitle = await Project.findOne({ title: titleOFProject });

    console.log("existingTitle: ", existingTitle);
    console.log("titleOFProject: ", titleOFProject);
    if (existingTitle) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Title is already already in use!" });
    }

    console.log(`In createProject for (${req.user.userType}) `, req.user.email);
    const ProjectObj = {
      title: titleOFProject,
      manager: managerOFProject,
      developers: [],
      qas: [],
      bugs: [],
    };

    // Creating a new project on DB
    const newProject = await Project.create({ ...ProjectObj });
    // newProject.addTitle(req.body.title);

    res
      .status(StatusCodes.CREATED)
      .json({ message: `Project (${titleOFProject}) created successfully` });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred Creating Project" });
  }
};

export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
    console.log(`User is ${req.user.email}`)
  // Checking if User Request is for Manager
  if (req.user.userType !== "manager") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "User is not a manager" });
  }
  // Checking for projectid
  if (
    req.body.projectid === undefined ||
    req.body.projectid === null ||
    req.body.projectid === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Project ID is missing" });
  }
  try {
    const idOfProjectToDelete = req.body.projectid;

    // Checking if a project with the provided title already exists
    const ProjectToBeDeleted = await Project.findOne({
      _id: idOfProjectToDelete,
    });
    if (!ProjectToBeDeleted) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Project ID is not valid" });
    }

    // Checking if This manager is managing this project or not
    if (ProjectToBeDeleted.manager != req.user.userId) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "You are not managing this project" });
    }

    // Deleting all the Bugs of this project on DB
    const bugsOfProject = ProjectToBeDeleted.bugs;
    for (const bugIdToDelete in bugsOfProject) {
      // Checking if a bug with the provided title already exists in DB
      const BugToBeDeleted = await Bug.findOne({ _id: bugIdToDelete });
      if (!BugToBeDeleted) {
        // Deleting the bug on DB
        await BugToBeDeleted.deleteOne();
      }
    }
    // Deleting the project on DB
    await ProjectToBeDeleted.deleteOne();
    // Sending the response
    res.status(StatusCodes.OK).json({
      message: `Project (${ProjectToBeDeleted.title}) deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred Creating Project" });
  }

//   res.send("deleteProject");
};
export const add = async (req: AuthenticatedRequest, res: Response) => {
  res.send("add project");
};
export const remove = async (req: AuthenticatedRequest, res: Response) => {
  res.send("remove project");
};
export const all = async (req: AuthenticatedRequest, res: Response) => {
  res.send("all project");
};

// // To get all managers
// export const getAllManagers = async (req: Request, res: Response) => {
//   try {
//     // Fetch all managers from the database
//     const managers = await Manager.find();

//     res.status(StatusCodes.OK).json({ managers });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "An error occurred while fetching managers" });
//   }
// };

// // To create a new manager
// export const signup = async (req: Request, res: Response) => {
//   console.log("In signup");
//   console.log(req.body);
//   // Checking if all fields are filled
//   const { firstName, lastName, email, password, userType } = req.body;
//   if (!firstName || !lastName || !email || !password || !userType) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ error: "Missing required fields" });
//   }

//   // Checking if User Request is for Manager
//   if (userType !== "manager") {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ error: "UserType is not manager" });
//   }

//   // Check if a manager with the provided email already exists
//   const existingQA = await QA.findOne({ email });
//   const existingManager = await Manager.findOne({ email });
//   const existingDeveloper = await Developer.findOne({ email });
//   if (existingQA || existingManager || existingDeveloper) {
//     return res
//       .status(StatusCodes.CONFLICT)
//       .json({ error: "Email already in use!" });
//   }

//   // making manager object
//   const managerObj = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     userType: req.body.userType,
//   };

//   try {
//     // Check if a manager with the provided email already exists
//     const existingManager = await Manager.findOne({ email });
//     if (existingManager) {
//       return res
//         .status(StatusCodes.CONFLICT)
//         .json({ error: "Email already exists" });
//     }
//     const manager = await Manager.create({ ...managerObj });
//     const token = manager.createJWT();
//     // Not sending back password
//     manager.password = "";
//     res.status(StatusCodes.CREATED).json({ manager,token });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "An error occurred while creating the manager" });
//   }
// };

// // To login a manager
// export const login = async (req: Request, res: Response) => {
//   const { email, password, userType } = req.body;

//   if (!email || !password || !userType) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ error: "Please provide email, password and userType" });
//   }

//   // Checking if User Request is for Manager
//   if (userType !== "manager") {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ error: "UserType is not manager" });
//   }

//   const manager = await Manager.findOne({ email });
//   // Whne manager is not found
//   if (!manager) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ error: "Invalid Credentials" });
//   }

//   // Checking Password
//   const isPasswordCorrect = await manager.comparePassword(password);
//   // When Passwor is incorrect or not found
//   if (!isPasswordCorrect) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ error: "Invalid Credentials" });
//   }

//   const token = manager.createJWT();
//   // Not sending back password
//   manager.password = "";
//   res.status(StatusCodes.OK).json({ manager,token });
// };
