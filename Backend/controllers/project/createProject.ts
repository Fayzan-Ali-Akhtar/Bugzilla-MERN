import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const Project = require("../../models/Project");

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
