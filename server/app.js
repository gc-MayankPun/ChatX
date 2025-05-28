const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");
const generalChatRoutes = require("./routes/generalChatRoutes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
require("dotenv").config();

app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRoutes);
app.use("/auth", authRoutes);
app.use("/generalChat", generalChatRoutes);

app.use(errorHandler);

module.exports = app;
