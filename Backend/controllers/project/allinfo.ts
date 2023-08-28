import { Response } from "express";
import { AuthenticatedRequest, ProjectType } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const allinfo = async (req: AuthenticatedRequest, res: Response) => {
  //   res.send("allinfo project");

  console.log(`User is ${req.user.email} ${req.user.userType}}`);

  const userType: string = req.user.userType;

  // Checking if User is valid
  if (userType !== "manager" && userType !== "developer" && userType !== "qa") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "User is not a valid" });
  }

  try {
    // Getting all the Projects from DB
    const allProjects = await Project.find({});
    //  allProjects = [];
    let filteredProjects: ProjectType[] = [];
    // if (!allProjects) {
    //   return res
    //     .status(StatusCodes.OK)
    //     .json({ message: "No projects found", projects: filteredProjects });
    // }

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

      //   Filtering all the projects for this developer
      filteredProjects = allProjects.filter((project: ProjectType) => {
        return project.developers.includes(userId);
      });
    } else if (userType === "qa") {
      // Checking if a qa with the provided title already exists in DB
      const QAUser = await QA.findOne({ _id: userId });

      if (!QAUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "QA ID is not valid" });
      }

      //   Filtering all the projects for this qa
      filteredProjects = allProjects.filter((project: ProjectType) => {
        return project.qas.includes(userId);
      });
    } else if (userType === "manager") {
      // Checking if a bug with the provided title already exists in DB

      const ManagerUser = await Manager.findOne({ _id: userId });

      if (!ManagerUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: "Manager ID is not valid" });
      }

      //   Filtering all the projects for this manager
      filteredProjects = allProjects.filter((project: ProjectType) => {
        return project.manager === userId;
      });
    } else {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "User type is not valid" });
    }

    // Sending the response
    res.status(StatusCodes.OK).json({
      message: `All projects fetched successfully`,
      projects: filteredProjects,
    });
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
