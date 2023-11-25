const Events = require("./../models/events.models");
const Registrations = require("./../models/registrations.models");
const AppError = require("./../utils/appError.utils");
const { errorCodes } = require("./../utils/constants.utils");

async function getMyHostedEvents(hostId) {
  const myHostedEvents = await Events.find({ hostId: hostId });
  return myHostedEvents;
}

async function hostNewEvent(
  name,
  description,
  date,
  location,
  image,
  limit,
  price,
  hostId
) {
  const newEvent = await Events.create({
    name,
    description,
    date,
    location,
    image,
    limit,
    price,
    hostId,
  });

  return newEvent;
}

async function updateMyEventDetails(
  eventId,
  name,
  description,
  date,
  location,
  image,
  limit,
  price,
  hostId
) {
  //check if event exists
  const event = await Events.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404, errorCodes.EVENT_ID_NOT_FOUND);
  }

  //check if event is hosted by user
  if (event.hostId != hostId) {
    throw new AppError(
      "You are not authorized to update this event",
      403,
      errorCodes.USER_NOT_AUTHORIZED
    );
  }

  //check if event is expired event.date is timestamp
  const currentDate = new Date().getTime();
  const eventDate = event.date;
  if (currentDate > eventDate) {
    throw new AppError("Event is expired", 400, errorCodes.EVENT_EXPIRED);
  }

  //update event
  const updatedEvent = await Events.findByIdAndUpdate(
    eventId,
    {
      name: name || event.name,
      description: description || event.description,
      date: date || event.date,
      location: location || event.location,
      image: image || event.image,
      limit: limit || event.limit,
      price: price || event.price,
    },
    { new: true }
  );

  return updatedEvent;
}

async function deleteMyHostedEvent(eventId, hostId) {
  //check if event exists
  const event = await Events.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404, errorCodes.EVENT_ID_NOT_FOUND);
  }

  //check if event is hosted by user
  if (event.hostId != hostId) {
    throw new AppError(
      "You are not authorized to delete this event",
      403,
      errorCodes.USER_NOT_AUTHORIZED
    );
  }

  //if has user registrations for the event cant delete
  const eventRegistrations = await Registrations.find({ eventId: eventId });
  if (eventRegistrations.length > 0) {
    throw new AppError(
      "Event has registrations. Cannot delete",
      400,
      errorCodes.EVENT_HAS_REGISTRATIONS
    );
  }

  const currentDate = new Date().getTime();
  const eventDate = event.date;
  if (currentDate > eventDate) {
    throw new AppError("Event is expired", 400, errorCodes.EVENT_EXPIRED);
  }

  //delete event
  await Events.findByIdAndDelete(eventId);
  return event._id;
}

async function getMyHostedEventRegistrations(eventId, userId) {
  //check if event exists
  const event = await Events.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404, errorCodes.EVENT_ID_NOT_FOUND);
  }

  //check if event is hosted by user
  if (event.hostId != userId) {
    throw new AppError(
      "You are not authorized to view this event",
      403,
      errorCodes.USER_NOT_AUTHORIZED
    );
  }

  //get event registrations
  const eventRegistrations = await Registrations.find({
    eventId: eventId,
  }).populate("userId", { name: 1, email: 1, contact: 1 });

  return eventRegistrations;
}

module.exports = {
  getMyHostedEvents,
  hostNewEvent,
  updateMyEventDetails,
  deleteMyHostedEvent,
  getMyHostedEventRegistrations,
};
