const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const dotenv = require("dotenv");
const authMiddleware = require("./middlewares/authMiddleware");
dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGINS,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

app.use("/", authRoutes);

app.use(errorHandler);

module.exports = app;
