import express, { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./Connect');
require('dotenv').config();

const Task = require('./models/Task');
app.use(express.json());

app.get('/api', async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).send(task);
});




const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

// Collections: 
// 1) Managers 
// 2) Projects 
// 3) Bugs 
// 4) Developers 
// 5) QAs 