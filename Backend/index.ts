import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./DB/Connect');
require('dotenv').config();
const cors = require('cors');
// Importing Routes 
const maganerRouter = require('./routes/managerRoute');
const developerRouter = require('./routes/developerRoute');
const qaRouter = require('./routes/qaRoute');
const projectRouter = require('./routes/projectRoute');
const bugRouter = require('./routes/bugRoute');

// Use the cors middleware to allow cross-origin requests
app.use(cors());

app.use(express.json());

// For Manager Routes
app.use('/api/manager', maganerRouter);

// For Developer Routes
app.use('/api/developer', developerRouter);

// For QA Routes
app.use('/api/qa', qaRouter);

// For Project Routes
app.use('/api/project', projectRouter);

// For Bug Routes
app.use('/api/bug', bugRouter);

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