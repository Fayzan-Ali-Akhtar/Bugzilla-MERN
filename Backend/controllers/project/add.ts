import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const add = async (req: AuthenticatedRequest, res: Response) => {
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
    req.body.dataToBeAdded === undefined ||
    req.body.dataToBeAdded === null ||
    req.body.dataToBeAdded === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "dataToBeAdded is missing" });
  }
  // Checking for typeToBeAdded
  if (
    req.body.typeToBeAdded === undefined ||
    req.body.typeToBeAdded === null ||
    req.body.typeToBeAdded === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "typeToBeAdded is missing" });
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

    let dataToBeAdded: string = req.body.dataToBeAdded;
    let typeToBeAdded: string = req.body.typeToBeAdded;
    console.log("dataToBeAdded : ", dataToBeAdded);
    console.log("typeToBeAdded : ", typeToBeAdded);

    

    if (typeToBeAdded === "developer") {
      // Checking if a developer with the provided title already exists in DB
      const DeveloperToBeAdded = await Developer.findOne({
        _id: dataToBeAdded,
      });
      if (!DeveloperToBeAdded) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer ID is not valid" });
      }
      // Check to make sure that this developer is not already added to this project
      const developersOfProject = ProjectToBeUpdated.developers;

      if (developersOfProject.includes(dataToBeAdded)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer is already added to this project" });
      }

      // Adding the developer on DB
      ProjectToBeUpdated.addDeveloper(dataToBeAdded);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else if (typeToBeAdded === "qa") {
      // Checking if a qa with the provided title already exists in DB
      const QAToBeAdded = await QA.findOne({ _id: dataToBeAdded });
      if (!QAToBeAdded) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA ID is not valid" });
      }
      // Check to make sure that this qa is not already added to this project
      const qasOfProject = ProjectToBeUpdated.qas;
      if (qasOfProject.includes(dataToBeAdded)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA is already added to this project" });
      }

      // Adding the qa on DB
      ProjectToBeUpdated.addQA(dataToBeAdded);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else if (typeToBeAdded === "bug") {
      // Checking if a bug with the provided title already exists in DB
      const BugToBeAdded = await Bug.findOne({ _id: dataToBeAdded });
      if (!BugToBeAdded) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Bug ID is not valid" });
      }
      // Check to make sure that this bug is not already added to this project
      const bugsOfProject = ProjectToBeUpdated.bugs;
      if (bugsOfProject.includes(dataToBeAdded)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Bug is already added to this project" });
      }

      // Adding the bug on DB
      ProjectToBeUpdated.addBug(dataToBeAdded);
      await ProjectToBeUpdated.save(); // Save the changes to the database
    } else {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "typeToBeAdded is not valid" });
    }

    // Sending the response
    res.status(StatusCodes.OK).json({
      message: `${dataToBeAdded} is added in (${ProjectToBeUpdated.title}) successfully`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while adding a value in Project" });
  }
};
