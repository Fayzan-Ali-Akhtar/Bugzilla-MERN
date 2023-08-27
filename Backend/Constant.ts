// export interface AuthenticatedRequest extends Request {
//     headers: {
//         authorization: string;
//       };
//     user: {
//       userId: string; // Adjust the type as needed
//       email: string; // Adjust the type as needed
//       userType: string; // Adjust the type as needed
//     };
//   }

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    userType: string;
  };
}






