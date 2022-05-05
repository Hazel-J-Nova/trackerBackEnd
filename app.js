const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const dbUrl = "mongodb://localhost:27017/tracker";
// const setTime = require("./utils/timer2");
// const setTimeTwo = require("./utils/timerOne");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

app.get("/", async (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
