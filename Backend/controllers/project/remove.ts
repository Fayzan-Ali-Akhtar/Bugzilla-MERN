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
  
      let personToRemove: string = "";
  
      // Sending the response
      res.status(StatusCodes.OK).json({
        message: `${personToRemove} was removed from (${ProjectToBeUpdated.title}) successfully`,
      });
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An error occurred while removing a person in Project" });
    }
    //   res.send("remove project");
  };