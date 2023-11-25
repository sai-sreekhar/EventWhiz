const { errorCodes } = require("../utils/constants.utils.js");
const AppError = require("./../utils/appError.utils.js");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use anothe value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorProdEnv = (err, res) => {
  //sending users only operational errors i.e. errors caused by their inputs back
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      data: {
        errorCode: err.errorCode,
        errorDesc: err.message,
      },
    });
  }
  //sending a generic response incase of errors due to coding problems
  else {
    //logging it for my reference
    console.error("ERROR 💥", err);

    //sending generic response
    res.status(500).json({
      status: "error",
      data: {
        errorCode: errorCodes.INTERNAL_SERVER_ERROR,
        errorDesc: "Something went wrong!",
      },
    });
  }
};

const sendErrorDevEnv = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    data: {
      errorCode: err.errorCode,
      errorDesc: err.message,
      stack: err.stack,
    },
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    sendErrorDevEnv(err, res);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    //handling invalid mongodb field errors by changing them to operational errors
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);

    //handling duplicate fields in mongodb by changing them to operational errors
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    //handling mongoose validation errors
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    sendErrorProdEnv(error, res);
  }
};
