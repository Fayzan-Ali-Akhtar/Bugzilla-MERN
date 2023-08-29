import { Response } from "express";
import { AuthenticatedRequest, BugType } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const info = async (req: AuthenticatedRequest, res: Response) => {
  console.log(`User is ${req.user.email} ${req.user.userType}}`);

  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    let filteredBugs: BugType[] = [];
    // Checking if User is valid
    if (
      userType !== "manager" &&
      userType !== "developer" &&
      userType !== "qa"
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is not a valid" });
    }

    // Checking for projectID
    if (
      req.query.projectID === undefined ||
      req.query.projectID === null ||
      req.query.projectID === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "projectID is missing for new bug" });
    }

    // Checking if Project exist in DB or not
    const projectID = req.query.projectID;

    const ProjectObj = await Project.findOne({ _id: projectID });
    if (!ProjectObj) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Project ID is not valid" });
    }

    if (userType === "developer") {
      // Checking if a developer with the provided id already exists in DB
      const developerUser = await Developer.findOne({
        _id: userId,
      });

      if (!developerUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer ID is not valid" });
      }

      //   Checking if this developer is a part of this project
      if (!ProjectObj.developers.includes(userId)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer is not a part of this project" });
      }

      //   Filtering all the bugs for this developer
      filteredBugs = await Bug.find({
        projectID: projectID,
      }); 
    }
    else if (userType === "qa") {
      // Checking if a qa with the provided id already exists in DB
      const qaUser = await QA.findOne({
        _id: userId,
      });

      if (!qaUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA ID is not valid" });
      }

      //   Checking if this qa is a part of this project
      if (!ProjectObj.qas.includes(userId)) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA is not a part of this project" });
      }

      //   Filtering all the bugs for this developer
      filteredBugs = await Bug.find({
        projectID: projectID,
      }); 
    }
    else if (userType === "manager") {
      // Checking if a manager with the provided id already exists in DB
      const managerUser = await Manager.findOne({
        _id: userId,
      });

      if (!managerUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Manager ID is not valid" });
      }

      //   Checking if this Manager is a part of this project
      if (ProjectObj.manager !==userId) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Manager is not a part of this project" });
      }

      //   Filtering all the bugs for this developer
      filteredBugs = await Bug.find({
        projectID: projectID,
      }); 
    }
    
    const bugs = filteredBugs;
    // Sending the response
    res.status(StatusCodes.OK).json({
      bugs
    });
    
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while getting bugs" });
  }
};

// send back info for a particular project
// like: developers added vs not added
// like: qa added vs not qa added
// like: bugs
