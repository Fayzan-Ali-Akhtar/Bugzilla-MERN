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
  // Add other properties as needed
}






