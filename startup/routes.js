const express = require("express");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use(error); //middlewarre for catching promise rejections
};
