const Events = require("./../models/events.models");
const Registrations = require("./../models/registrations.models");
const AppError = require("./../utils/appError.utils");
const { errorCodes } = require("./../utils/constants.utils");

async function getUserRegistrations(userId) {
  const userRegistrations = await Registrations.find({
    userId: userId,
  }).populate("eventId");
  return userRegistrations;
}

async function registerEventService(userId, eventId) {
  //check if event exists
  const event = await Events.findById(eventId);
  if (!event) {
    throw new AppError(
      "Event with the given ID does not exist",
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  //self registration
  if (event.hostId.toString() === userId) {
    throw new AppError(
      "User cannot register for his own event",
      400,
      errorCodes.USER_REGISTERING_FOR_OWN_EVENT
    );
  }

  //check if user is already registered for the event
  const registration = await Registrations.findOne({
    userId: userId,
    eventId: eventId,
  });

  if (registration) {
    throw new AppError(
      "User is already registered for the event",
      400,
      errorCodes.USER_ALREADY_REGISTERED
    );
  }

  //check if event is full
  const filledSeats = await Registrations.countDocuments({ eventId: eventId });
  const seatsLeft = event.limit - filledSeats;
  if (seatsLeft === 0) {
    throw new AppError("Event is full", 400, errorCodes.EVENT_FULL);
  }

  //check if event is expired event.date is timestamp
  const currentDate = new Date().getTime(); //convert to seconds
  const eventDate = event.date;
  if (currentDate > eventDate) {
    throw new AppError("Event is expired", 400, errorCodes.EVENT_EXPIRED);
  }

  //create registration
  const newRegistration = await Registrations.create({
    userId: userId,
    eventId: eventId,
    createdAt: Date.now(),
  });

  return newRegistration;
}

async function deleteRegistrationService(userId, eventId) {
  //check if event exists
  const event = await Events.findById(eventId);
  if (!event) {
    throw new AppError(
      "Event with the given ID does not exist",
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  //check if user is not registered for the event
  const registration = await Registrations.findOne({
    userId: userId,
    eventId: eventId,
  });

  if (!registration) {
    throw new AppError(
      "User is not registered for the event",
      400,
      errorCodes.USER_NOT_REGISTERED
    );
  }

  //check if event is expired event.date is timestamp
  const currentDate = new Date().getTime();
  const eventDate = event.date;
  if (currentDate > eventDate) {
    throw new AppError("Event is expired", 400, errorCodes.EVENT_EXPIRED);
  }

  //delete registration
  await Registrations.deleteOne({ userId: userId, eventId: eventId });

  return eventId;
}

module.exports = {
  getUserRegistrations,
  registerEventService,
  deleteRegistrationService,
};
