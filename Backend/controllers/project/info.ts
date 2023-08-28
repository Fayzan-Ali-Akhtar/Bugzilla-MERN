import { Response } from "express";
import { AuthenticatedRequest } from "../../Constant";
const { StatusCodes } = require("http-status-codes");
// Mongoose Model
const QA = require("../../models/QA");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");
const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

export const info = async (req: AuthenticatedRequest, res: Response) => {
  res.send("info project");
};

// send back info for a particular project
// like: developers added vs not added 
// like: qa added vs not qa added 
// like: bugs 
