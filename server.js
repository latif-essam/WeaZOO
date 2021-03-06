// Setup empty JS object to act as endpoint for all routes
const projectData = []; //act as the API endpoint
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 1997;
const server = app.listen(port, () =>
  console.log(`the website is runinng in port: ${port}`)
);

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/data", (req, res) => res.send(projectData));

// Post Route
app.post("/addData", addData);
function addData(req, res) {
  const newEnrey = {
    temp: req.body.temp,
    date: req.body.date,
    userInput: req.body.userInput,
    currentFeeling: req.body.feeling,
  };
  projectData.push(newEnrey);
  res.send(projectData);
  console.log(projectData);
}
