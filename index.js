require("express-async-errors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const express = require("express");
const app = express();

const keys = require("./config/keys");
const users = require("./routes/users");
const error = require("./middleware/error");


//startuj bazu
//require("./startup/db")();
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

//definisi rute
//require("./startup/routes")(app);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use("/api/users", users);//nasa api
app.use(error); //middlewarre for catching promise rejections

if (process.env.NODE_ENV === "production") {
  //for productiuion assets (bundle.js)
  //requested from index.html, odnosno sve sto je
  // potrebno react.js spa
  app.use(express.static("client/build"));

  //for home page index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
