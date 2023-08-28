import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    userType: string;
  };
}

export interface ProjectType {
  _id: string;
  developers: string[];
  qas: string[];
  manager: string;
}
export interface BugType {
  _id: string;
  title: string;
  deadline: string;
  status: string;
  type: string;
  projectID: string;
  developers: string[];
  description: string;
  screenshot: string;
}






