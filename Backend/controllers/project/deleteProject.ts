import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  console.log(`User is ${req.user.email} ${req.user.userType}}`);
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
};
