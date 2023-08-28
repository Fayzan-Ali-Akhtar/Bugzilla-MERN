import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const createBug = async (req: AuthenticatedRequest, res: Response) => {
  // res.send("create bug");
  try {
    // Checking if User Request is for qa
    if (req.user.userType !== "qa") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is not a qa" });
    }

    // Checking for Title
    if (
      req.body.title === undefined ||
      req.body.title === null ||
      req.body.title === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Title is missing for new bug" });
    }

    // Checking for Deadline
    if (
      req.body.deadline === undefined ||
      req.body.deadline === null ||
      req.body.deadline === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "deadline is missing for new bug" });
    }

    // Checking for type
    if (
      req.body.type === undefined ||
      req.body.type === null ||
      req.body.type === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "type is missing for new bug" });
    }
    // Checking values of type is only feature or bug 
    if(req.body.type !== "feature" && req.body.type !== "bug"){
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "type can only be feature or bug" });
    }

    // Checking for projectID
    if (
      req.body.projectID === undefined ||
      req.body.projectID === null ||
      req.body.projectID === ""
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "projectID is missing for new bug" });
    }

    const projectID :string = req.body.projectID;
    // Checking for valid Project ID
    const existingProject = await Project.findOne({ _id: projectID });
    if (!existingProject) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Project ID is not valid" });
    }

    // Checking if this QA is a part of this project
    const qaID = req.user.userId;
    if (!existingProject.qas.includes(qaID)) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "QA is not a part of this project" });
    }

    const titleOfBug = req.body.title;
    // Checking if a bug with the provided title already exists in the existingProject 
    const existingBugsIDs = existingProject.bugs;
    
    // Checking title of existing bug in the project
    for(const existingBugID of existingBugsIDs){
      const existingBug = await Bug.findOne({ _id: existingBugID });
      if(existingBug){
        if(existingBug.title === titleOfBug){
          return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Bug with this title already exists in the project" });
        }
      }
    }

    // Making new Bug Object 
    let bugDescription: string = "";
    let bugScreenshot: string = "";

    // Checking for bugDescription 
    if (
      req.body.description === undefined ||
      req.body.description === null ||
      req.body.description === ""
    ) {
      bugDescription = "";
    }
    else {
      bugDescription = req.body.description;
    }

    // Checking for bugDescription 
    if (
      req.body.screenshots === undefined ||
      req.body.screenshots === null ||
      req.body.screenshots === ""
    ) {
      bugScreenshot = "";
    }
    else {
      bugScreenshot = req.body.screenshot;
    }

    const bugObj = {
      title: titleOfBug,
      deadline: req.body.deadline,
      status: "new",
      type: req.body.type,
      projectID: projectID,
      developer: [],
      description: bugDescription,
      screenshots: bugScreenshot,
    };

    // Creating a new bug on DB
    const newBug = await Bug.create({ ...bugObj });

    // Adding this bug to the project
    existingProject.addBug(newBug._id);
    await existingProject.save(); // Save the changes to the database

    res
      .status(StatusCodes.CREATED)
      .json({ message: `Bug (${titleOfBug}) created successfully` });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred Creating Bug" });
  }
};
