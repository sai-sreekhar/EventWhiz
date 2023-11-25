const Events = require("./../models/events.models");
const AppError = require("./../utils/appError.utils");
const { errorCodes } = require("./../utils/constants.utils");

async function getAllEventsBriefInfo() {
  const events = await Events.find().select("name location date image");
  const unExpiredEvents = events.filter((event) => {
    return event.date > new Date().getTime();
  });
  return unExpiredEvents;
}

async function getEventById(id) {
  const event = await Events.findById(id).populate("hostId");
  if (!event) {
    throw new AppError("Event not found", 404, errorCodes.EVENT_ID_NOT_FOUND);
  }
  const eventInfo = {
    _id: event._id,
    name: event.name,
    location: event.location,
    date: event.date,
    limit: event.limit,
    description: event.description,
    hostName: event.hostId.name,
    hostContact: event.hostId.contact,
    hostEmail: event.hostId.email,
    image: event.image,
    price: event.price,
  };
  return eventInfo;
}

module.exports = {
  getAllEventsBriefInfo,
  getEventById,
};
