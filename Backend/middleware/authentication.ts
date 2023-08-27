import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();
import {AuthenticatedRequest} from '../Constant'


const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // checking header format
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized', message: 'Invalid JWT token' });
  }
  // Separating Token 
  const token = authHeader.split(' ')[1]

  try {
    const decriptedData = jwt.verify(token, process.env.JWT_SECRET as string,) as JwtPayload; // Specify JwtPayload type
    // attach the user to the job routes
    req.user = { userId: decriptedData.userId, email: decriptedData.email, userType : decriptedData.userType }
    console.log(`userId: ${req.user.userId}`)
    next()
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized', message: 'Invalid JWT token' });
  }
}

module.exports = authentication;

// module.exports = authentication;

// { userId: this._id, email: this.email,userType : this.userType },