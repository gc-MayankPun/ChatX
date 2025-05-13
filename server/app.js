const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
require("dotenv").config();

const allowedOrigins = JSON.parse(process.env.CORS_ORIGINS)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
