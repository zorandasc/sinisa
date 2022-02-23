const mongoose = require("mongoose");

const keys = require("./config/keys");

module.exports = function () {
  mongoose
    .connect(keys.mongoURI, {
      //useFindAndModify: false,
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conected to mongodb");
    })
    .catch((err) => {
      console.log("Eroro conecting to mongodb", err);
    });
};
