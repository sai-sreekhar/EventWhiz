const jwt = require("jsonwebtoken");
const Users = require("./../models/users.models");
const AppError = require("./../utils/appError.utils");
const { errorCodes } = require("./../utils/constants.utils");
const catchAsync = require("../utils/catchAsync.utils");

const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new AppError(
      "Access Denied: No token provided",
      403,
      errorCodes.INVALID_TOKEN
    );
  }

  const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await Users.findById({ _id: tokenDetails._id });
  if (!user) {
    throw new AppError(
      "Access Denied: Invalid token provided",
      403,
      errorCodes.INVALID_TOKEN
    );
  }

  req.user = tokenDetails;
  next();
});

module.exports = authMiddleware;
