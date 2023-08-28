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
  res.send("create bug");
};