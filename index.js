require("express-async-errors");
const helmet = require("helmet");
const compression = require("compression");
const express = require("express");
const app = express();

app.use(helmet());
app.use(compression());

//startuj bazu
require("./startup/db")();

//definisi rute
require("./startup/routes")(app);

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
