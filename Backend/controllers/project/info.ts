import { Response } from "express";
import { AuthenticatedRequest, ProjectType } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const info = async (req: AuthenticatedRequest, res: Response) => {
 
  console.log("Yo2.5");
  // console.log(req);

  console.log(`User is ${req.user.email} ${req.user.userType}}`);

  const userType: string = req.user.userType;

  // Checking if User is valid
  if (userType !== "manager" && userType !== "developer" && userType !== "qa") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "User is not a valid" });
  }

  try {
    
    // Checking for projectid
  if (
    req.query.projectid === undefined ||
    req.query.projectid === null ||
    req.query.projectid === ""
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Project ID is missing" });
  }

  const projectID = req.query.projectid;
  console.log("projectID : ",projectID);
  // Getting Particular Project from DB
  const matchingProject = await Project.findOne({_id: projectID});


    const userId = req.user.userId;

    if (userType === "developer") {
      // Checking if a developer with the provided title already exists in DB
      const developerUser = await Developer.findOne({
        _id: userId,
      });

      if (!developerUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Developer ID is not valid" });
      }

      
    } else if (userType === "qa") {
      // Checking if a qa with the provided title already exists in DB
      const QAUser = await QA.findOne({ _id: userId });

      if (!QAUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA ID is not valid" });
      }

      
    } else if (userType === "manager") {
      // Checking if a bug with the provided title already exists in DB

      const ManagerUser = await Manager.findOne({ _id: userId });

      if (!ManagerUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Manager ID is not valid" });
      }

      
    } else {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "User type is not valid" });
    }

    const project = matchingProject;
    // Sending the response
    console.log("project  found : ");
    console.log(project);
    res.status(StatusCodes.OK).json({ project});
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while getting Project" });
  }
};

// send back info for a particular project
// like: developers added vs not added
// like: qa added vs not qa added
// like: bugs
