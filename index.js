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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
