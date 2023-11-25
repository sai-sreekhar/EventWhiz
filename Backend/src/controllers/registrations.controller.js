const {
  getUserRegistrations,
  registerEventService,
  deleteRegistrationService,
} = require("../services/registrations.service");
const AppError = require("./../utils/appError.utils");
const catchAsync = require("./../utils/catchAsync.utils");
const { errorCodes } = require("./../utils/constants.utils");

exports.getRegisteredEvents = catchAsync(async (req, res, next) => {
  const registeredEvents = await getUserRegistrations(req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      message: "Registered Events fetched successfully",
      registeredEvents,
    },
  });
});

exports.registerEvent = catchAsync(async (req, res, next) => {
  const event = await registerEventService(req.user._id, req.params.eventId);
  res.status(200).json({
    status: "success",
    data: {
      message: "Event registered successfully",
      event,
    },
  });
});

exports.deleteRegistration = catchAsync(async (req, res, next) => {
  const eventId = await deleteRegistrationService(
    req.user._id,
    req.params.eventId
  );
  res.status(200).json({
    status: "success",
    data: {
      message: "Event deleted successfully",
      eventId,
    },
  });
});
