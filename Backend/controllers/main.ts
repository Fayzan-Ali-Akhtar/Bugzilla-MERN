// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard
import { Request, Response } from 'express';

const Manager = require('../models/Manager');

const jwt = require('jsonwebtoken')
// const { BadRequestError } = require('../errors')

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body
//   // mongoose validation
//   // Joi
//   // check in the controller

//   if (!username || !password) {
//     // throw new BadRequestError('Please provide email and password')
//   }

//   //just for demo, normally provided by DB!!!!
//   const id = new Date().getDate()

//   // try to keep payload small, better experience for user
//   // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
//   const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })

//   res.status(200).json({ msg: 'user created', token })
// }

// export const dashboard = async (req: Request, res: Response) => {
//     console.log("Here!");
//   const luckyNumber = Math.floor(Math.random() * 100)

//   res.status(200).json({
//     msg: `Hello,`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   })
// }

export const signup = async (req: Request, res: Response) => {
    console.log("Signup!");
    console.log(req.body);
    // making manager object 
    const managerObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
    }
    const manager = await Manager.create({ ...managerObj });
    res.status(200).json({ user: { manager }});

//   const luckyNumber = Math.floor(Math.random() * 100)
//     res.send(req.body);
//   res.status(200).json({
//     msg: `Hello signup manager,`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   })
}

// module.exports = {
//   login,
//   dashboard,
// }
