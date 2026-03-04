const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { errors } = require("celebrate");
const { NotFoundError } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const { PORT = 3001 } = process.env;

// ----------------------
// 🔹 Connect to MongoDB
// ----------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/news_explorer_db")
  .catch((err) => errorLogger.error(err));

// app.use(cors());
const allowedOrigins = [
  "https://news.douglasmaupin.com",
  "https://api.news.douglasmaupin.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

// ----------------------
// 🔹 Log all requests
// ----------------------
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// stop the application from trying to serve a favicon (which causes unnecessary 404 errors in the logs)
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) =>
  res.status(204).end()
);

// ----------------------
// 🔹 Main application routes
// ----------------------
app.use("/", mainRouter);

// ----------------------
// 🔹 Log all errors
// ----------------------
app.use(errorLogger);

// ----------------------
// 🔹 404 Handler
// ----------------------
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// ----------------------
// 🔹 Joi/Celebrate validation errors
// ----------------------
app.use(errors());

// ----------------------
// 🔹 Centralized error handler
// ----------------------
app.use(errorHandler);

// ----------------------
// 🔹 Start server
// ----------------------
app.listen(PORT, () => {
  requestLogger.info(`App listening on port ${PORT}`);
});
