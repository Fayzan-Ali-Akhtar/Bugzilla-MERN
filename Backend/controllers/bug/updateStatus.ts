import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const updateStatus = async (req: AuthenticatedRequest, res: Response) => {
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

        // Checking for BudStatus
        if (
            req.body.bugStatus === undefined ||
            req.body.bugStatus === null ||
            req.body.bugStatus === ""
          ) {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: "bugStatus is missing" });
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
        
        const newBugStatus:string = req.body.bugStatus;

        // Checking if the new status is valid
        if(newBugStatus !== "new" && newBugStatus !== "started" && newBugStatus !== "completed" && newBugStatus !== "resolved"){
            return res
                .status(StatusCodes.CONFLICT)
                .json({ error: "Bug status is not valid" });
        }

        // Changing the status of the bug
        bugToUpdated.setStatus(newBugStatus);
    
        await bugToUpdated.save(); // Save the changes to the database
    
        res
            .status(StatusCodes.OK)
            .json({ message: `Bug status was updated to (${newBugStatus})` });
        } catch (error) {
            console.error(error);
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "An error occurred while updating bug status" });
        }
    };