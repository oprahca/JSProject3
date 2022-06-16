/**
 * 300337817 Oprah Huang
 * set up a server and routes and middleware
 */
// let application to use express and port number
const express = require("express");
const app = express();

// fetch the json file of the object literal
const { projects } = require("./data.json");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// adding static assets
app.use("/static", express.static("public"));
// set view engine for pug
app.set("view engine", "pug");

// set the routes of index
app.get("/", (req, res) => {
  res.locals.projects = projects;
  res.render("index");
});

// set the routes of about
app.get("/about", (req, res) => {
  res.render("about");
});

// set the routes of project
app.get("/project", (req, res) => {
  res.render("project");
});

// set the routes of project's subpage
app.get("/project/:id", (req, res, next) => {
  const { id } = req.params;
  res.locals = projects[id];
  if (id < projects.length) {
    res.render("project");
  } else {
    next();
  }
});

// middleware run if no routes match with 404 errors
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

// error handling middleware run if object passed
app.use((err, req, res, next) => {
  res.status(err.status);
  console.log(err.status || 500);
  res.render("error", {
    message: err.message,
    status: `Error:${err.status}`,
    error: err,
  });
});

// start the server with port 3000
app.listen(3000, () => {
  console.log(`Server running on: localhost:3000`);
});
