const express = require("express");
const myEventsController = require("./../../controllers/myEvents.controller");
const myEventsRouter = express.Router();
const authMiddleware = require("./../../middlewares/auth.middlewares");

myEventsRouter
  .route("/")
  .get(authMiddleware, myEventsController.getMyEvents)
  .post(authMiddleware, myEventsController.createMyEvent);
myEventsRouter
  .route("/:eventId")
  .put(authMiddleware, myEventsController.updateMyEvent)
  .delete(authMiddleware, myEventsController.deleteMyEvent);
myEventsRouter
  .route("/registrations/:eventId")
  .get(authMiddleware, myEventsController.getMyEventRegistrations);

module.exports = myEventsRouter;
