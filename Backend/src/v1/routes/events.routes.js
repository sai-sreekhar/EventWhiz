const express = require("express");
const eventsController = require("./../../controllers/events.controller");
const eventsRouter = express.Router();
const authMiddleware = require("./../../middlewares/auth.middlewares");

eventsRouter.route("/").get(eventsController.getAllEvents);
eventsRouter.route("/:eventId").get(authMiddleware, eventsController.getAnEvent);

module.exports = eventsRouter;
