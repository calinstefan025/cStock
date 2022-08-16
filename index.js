require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

/////////////////////////////////////////

const app = express();
app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT || 3000;

/////////////////////////////////////////
var homeRoutes = require("./routers/home.js");
var stockRoutes = require("./routers/stock.js");

/////////////////////////////////////////

app.use("/", homeRoutes);
app.use("/stock", stockRoutes);

/////////////////////////////////////////

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
