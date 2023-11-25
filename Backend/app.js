const serverless = require("serverless-http");
const express = require("express");
const errorController = require("./src/controllers/error.controller");
const { errorCodes } = require("./src/utils/constants.utils");
const AppError = require("./src/utils/appError.utils");
const morgan = require("morgan");
const path = require("path");
// const { connectToDatabase } = require("./src/configs/db.config");
const { connectToDB } = require("./src/configs/db.config");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const app = express();
app.use(express.json());
const AWS = require("aws-sdk");

AWS.config.update({
  credentials: {
    accessKeyId: process.env.USER_ACCESS_KEY,
    secretAccessKey: process.env.USER_SECRET_KEY,
  },
  region: process.env.BUCKET_REGION,
});

// connectToDatabase()
//   .then(() => console.log("Connected to Database"))
//   .catch((error) => console.log(error));

connectToDB(process.env.DB_CONNECTION);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

morgan.token("req-headers", function (req, res) {
  return JSON.stringify(req.headers);
});

process.env.NODE_ENV != "PRODUCTION" &&
  app.use(morgan(":method :url :status :req-headers"));

app.use("/api/v1/auth", require("./src/v1/routes/auth.routes"));
app.use("/api/v1/myevents", require("./src/v1/routes/myEvents.routes"));
app.use("/api/v1/events", require("./src/v1/routes/events.routes"));
app.use("/api/v1/users", require("./src/v1/routes/users.routes"));
app.use(
  "/api/v1/registrations",
  require("./src/v1/routes/registrations.routes")
);
app.use("/api/v1/aws/s3", require("./src/v1/routes/aws.s3.routes"));

//all invalid urls handled here
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server`,
      404,
      errorCodes.INVALID_URL
    )
  );
});

app.use(errorController);

module.exports.handler = serverless(app);
