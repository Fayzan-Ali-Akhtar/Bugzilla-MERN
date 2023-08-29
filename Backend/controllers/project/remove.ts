import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const remove = async (req: AuthenticatedRequest, res: Response) => {
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
  // Checking for personToBeAdded
  if (
    req.body.dataToBeRemoved === undefined ||
    req.body.dataToBeRemoved === null ||
    req.body.dataToBeRemoved === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "dataToBeRemoved is missing" });
  }
  // Checking for typeToBeRemoved
  if (
    req.body.typeToBeRemoved === undefined ||
    req.body.typeToBeRemoved === null ||
    req.body.typeToBeRemoved === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "typeToBeRemoved is missing" });
  }
  try {
    const idOfProjectToUpdate = req.body.projectid;

    // Checking if a project with the provided title already exists
    const ProjectToBeUpdated = await Project.findOne({
      _id: idOfProjectToUpdate,
    });
    if (!ProjectToBeUpdated) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Project ID is not valid" });
    }

    // Checking if This manager is managing this project or not
    if (ProjectToBeUpdated.manager != req.user.userId) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "You are not managing this project" });
    }

    let dataToBeRemoved: string = req.body.dataToBeRemoved;
    let typeToBeRemoved: string = req.body.typeToBeRemoved;

    if (typeToBeRemoved === "developer") {
      // Checking if a developer with the provided title already exists in DB
      const DeveloperToBeRemoved = await Developer.findOne({
        _id: dataToBeRemoved,
      });
      if (!DeveloperToBeRemoved) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer ID is not valid" });
      }
      // Check to make sure that this developer is not already added to this project
      const developersOfProject = ProjectToBeUpdated.developers;

      if (!developersOfProject.includes(dataToBeRemoved)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer is not in this project" });
      }

      // Removing the developer from DB
      ProjectToBeUpdated.removeDeveloper(dataToBeRemoved);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else if (typeToBeRemoved === "qa") {
      // Checking if a qa with the provided title already exists in DB
      const QAToBeRemoved = await QA.findOne({ _id: dataToBeRemoved });
      if (!QAToBeRemoved) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA ID is not valid" });
      }
      // Check to make sure that this qa is not already added to this project
      const qasOfProject = ProjectToBeUpdated.qas;
      if (!qasOfProject.includes(dataToBeRemoved)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA is not in this project" });
      }

      // Removing the qa from DB
      ProjectToBeUpdated.removeQA(dataToBeRemoved);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else if (typeToBeRemoved === "bug") {
      // Checking if a bug with the provided title already exists in DB
      const BugToBeRemoved = await Bug.findOne({ _id: dataToBeRemoved });
      if (!BugToBeRemoved) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Bug ID is not valid" });
      }
      // Check to make sure that this bug is not already added to this project
      const bugsOfProject = ProjectToBeUpdated.bugs;
      if (!bugsOfProject.includes(dataToBeRemoved)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Bug is not in this project" });
      }

      // Removing the bug on DB
      ProjectToBeUpdated.addBug(dataToBeRemoved);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "typeToBeRemoved is not valid" });
    }

    // Sending the response
    res.status(StatusCodes.OK).json({
      message: `${dataToBeRemoved} is removed from (${ProjectToBeUpdated.title}) successfully`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while removing a value from Project" });
  }
};
