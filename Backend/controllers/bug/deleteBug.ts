import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const deleteBug = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Checking if User Request is for qa
    if (req.user.userType !== "qa") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is not a qa" });
    }

    // Checking for BugID
    if (
      req.body.bugID === undefined ||
      req.body.bugID === null ||
      req.body.bugID === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "bugID is missing for new bug" });
    }

    const bugToDeleteID:string = req.body.bugID;

    // Checking if this bug exist on DB 
    const bugToDelete = await Bug.findOne({ _id: bugToDeleteID });
    if (!bugToDelete) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({ error: "Bug ID is not valid" });
    }

    // Getting the project of this bug from DB
    let ProjectObj = await Project.findOne({_id : bugToDelete.projectID});

    // console.log('ProjectObj.qas:', ProjectObj.qas); // Add this line to see the content of ProjectObj.qas

    if(!ProjectObj){
        return res
            .status(StatusCodes.CONFLICT)
            .json({ error: "Bug ID is not found in a project" });
    }

    // Checking if this QA is a part of this project
    const qaID = req.user.userId;
    if (!(ProjectObj.qas.includes(qaID))) {
        return res
            .status(StatusCodes.CONFLICT)
            .json({ error: "QA is not a part of this project" });
    }

    // Deleting the bug on DB
    await bugToDelete.deleteOne();

    // Deleting the bug from the project
    ProjectObj.removeBug(bugToDeleteID);
    await ProjectObj.save(); // Save the changes to the database

    res
        .status(StatusCodes.OK)
        .json({ message: `Bug (${bugToDelete.title}) deleted successfully` });
    } catch (error) {
        console.error(error);
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred Deleting a Bug" });
    }
};