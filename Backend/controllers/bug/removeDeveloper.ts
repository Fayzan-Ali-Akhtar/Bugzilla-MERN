import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const removeDeveloper = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Checking if User Request is for developer
    if (req.user.userType !== "developer") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is not a developer" });
    }

    // Checking for BugID
    if (
        req.body.bugID === undefined ||
        req.body.bugID === null ||
        req.body.bugID === ""
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "bugID is missing" });
      }

      const bugID:string = req.body.bugID;

      // Checking if this bug exist on DB 
      const bugToUpdated = await Bug.findOne({ _id: bugID });
      if (!bugToUpdated) {
          return res
              .status(StatusCodes.CONFLICT)
              .json({ error: "Bug ID is not valid" });
      }
  
      // Getting the project of this bug from DB
      let ProjectObj = await Project.findOne({_id : bugToUpdated.projectID});
  
      if(!ProjectObj){
          return res
              .status(StatusCodes.CONFLICT)
              .json({ error: "Bug ID is not found in a project" });
      }
  
      const developerID = req.user.userId;

      // Checking if this Developer is a part of this project
    
      if (!(ProjectObj.developers.includes(developerID))) {
          return res
              .status(StatusCodes.CONFLICT)
              .json({ error: "developer is not a part of this project" });
      }

    //   Checking if Developer is a part of this bug or not
    if (!(bugToUpdated.developers.includes(developerID))) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({ error: "Developer is not a part of this bug" });
    }

    // Adding this developer to the bug
    bugToUpdated.removeDeveloper(developerID);

    // Changing the status of the bug to "in progress" 
    if(bugToUpdated.status !== "completed" && bugToUpdated.status !== "resolved")
    {
      if(bugToUpdated.developers.length === 0)
      {
        bugToUpdated.status = "new";
      }
    }

    await bugToUpdated.save(); // Save the changes to the database

    res
        .status(StatusCodes.OK)
        .json({ message: `Developer (${developerID}) removed successfully` });
    } catch (error) {
        console.error(error);
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred removing developer" });
    }
};