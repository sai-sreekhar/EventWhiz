const express = require("express");
const userController = require("./../../controllers/users.controller");
const userRouter = express.Router();
const authMiddleware = require("./../../middlewares/auth.middlewares");

userRouter
  .route("/")
  .get(authMiddleware, userController.getUserDetails)
  .put(authMiddleware, userController.updateUserDetails);
  
module.exports = userRouter;