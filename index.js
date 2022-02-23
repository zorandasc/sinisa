require("express-async-errors");
const express = require("express");
const app = express();

//startuj bazu
require("./src/db")();

//definisi rute
require("./src/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
