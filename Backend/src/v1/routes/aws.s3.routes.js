const express = require("express");
const awsS3Controller = require("./../../controllers/aws.s3.controller");
const awsS3Router = express.Router();
const authMiddleware = require("./../../middlewares/auth.middlewares");

awsS3Router
  .route("/signUrl/put/:fileName")
  .post(authMiddleware, awsS3Controller.getAwsS3SignedUrlForUpload);
awsS3Router
  .route("/signUrl/get/:fileName")
  .post(authMiddleware, awsS3Controller.getAWSS3SignedUrlForView);

module.exports = awsS3Router;
