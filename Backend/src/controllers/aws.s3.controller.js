const {
  getAwsS3SignedUrlforUploadBodyValidation,
} = require("../validations/getAwsS3SignedUrlForUpload.validation");
const AppError = require("./../utils/appError.utils");
const catchAsync = require("./../utils/catchAsync.utils");
const { errorCodes, imageTypes } = require("./../utils/constants.utils");
const AWS = require("aws-sdk");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const s3 = new AWS.S3();

exports.getAwsS3SignedUrlForUpload = catchAsync(async (req, res, next) => {
  const { error } = getAwsS3SignedUrlforUploadBodyValidation(req.body);
  if (error) {
    throw new AppError(
      error.details[0].message,
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  let key = "";
  if (req.body.type === imageTypes.USER_IMAGE) {
    key = `users/${req.user._id}/${req.params.fileName}`;
  } else if (req.body.type === imageTypes.EVENT_IMAGE) {
    key = `events/${req.body.eventId}/${req.params.fileName}`;
  } else {
    throw new AppError("Invalid type", 400, errorCodes.INPUT_PARAMS_INVALID);
  }

  const preSignedUrl = s3.getSignedUrl("putObject", {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: 300,
  });

  res.send({
    status: "success",
    data: {
      preSignedUrl,
    },
  });
});

exports.getAWSS3SignedUrlForView = catchAsync(async (req, res, next) => {
  const preSignedUrl = s3.getSignedUrl("getObject", {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: req.params.fileName,
    Expires: 300,
  });

  res.send({
    status: "success",
    data: {
      preSignedUrl,
    },
  });
});
