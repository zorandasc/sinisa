require("express-async-errors");
const helmet = require("helmet");
const compression = require("compression");
const express = require("express");
const app = express();

app.use(helmet());
app.use(compression());

//startuj bazu
require("./src/db")();

//definisi rute
require("./src/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
