const { updateUser, getUser } = require("../services/users.service");
const AppError = require("../utils/appError.utils");
const catchAsync = require("../utils/catchAsync.utils");
const { errorCodes } = require("../utils/constants.utils");
const {
  updateUserDetailsBodyValidation,
} = require("../validations/updateUser.validation");

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const userDetails = await getUser(req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      message: "User Details fetched successfully",
      userDetails,
    },
  });
});

exports.updateUserDetails = catchAsync(async (req, res, next) => {
  const { error } = updateUserDetailsBodyValidation(req.body);
  if (error) {
    throw new AppError(
      error.details[0].message,
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  const user = await updateUser(
    req.user._id,
    req.body.name,
    req.body.email,
    req.body.contact
  );

  res.status(200).json({
    status: "success",
    data: {
      message: "User Details updated successfully",
      user,
    },
  });
});
