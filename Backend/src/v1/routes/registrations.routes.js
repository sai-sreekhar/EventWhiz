const express = require("express");
const registrationsController = require("./../../controllers/registrations.controller");
const registrationsRouter = express.Router();
const authMiddleware = require("./../../middlewares/auth.middlewares");

registrationsRouter
  .route("/")
  .get(authMiddleware, registrationsController.getRegisteredEvents);
registrationsRouter
  .route("/:eventId")
  .post(authMiddleware, registrationsController.registerEvent)
  .delete(authMiddleware, registrationsController.deleteRegistration);

module.exports = registrationsRouter;
