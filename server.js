require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const taskFormDataRoutes = require('./routes/taskFormDataRoutes');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // X-Token-Auth
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	next();
});

// authorise CROS

//express app




//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/form-data', taskFormDataRoutes);
//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requists
    app.listen(process.env.PORT, () => {
      console.log("listeneing on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
