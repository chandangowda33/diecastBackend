const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(mongoSanitize());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/userRegisteration", userRoutes);

module.exports = app;
