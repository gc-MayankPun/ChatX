const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const allowedOrigins = process.env.ORIGINS;
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log("Hello Bitches");
  res.send("Hello");
});

app.get("/login", (req, res) => {
  console.log("Hello There");
});

app.get("/validate", (req, res) => {
  //   console.log(req.headers);
});

module.exports = app;
