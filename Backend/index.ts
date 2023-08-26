import express, { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./DB/Connect');
require('dotenv').config();
const cors = require('cors');
const maganerRouter = require('./routes/manager');


const Task = require('./models/Task');

// Use the cors middleware
app.use(cors());


app.use(express.json());

app.use('/api/manager', maganerRouter);

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