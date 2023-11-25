const {
  getMyHostedEvents,
  hostNewEvent,
  updateMyEventDetails,
  deleteMyHostedEvent,
  getMyHostedEventRegistrations,
} = require("../services/myEvents.service");
const {
  createMyEventBodyValidation,
} = require("../validations/createMyEvent.validation");
const {
  updateMyEventBodyValidation,
} = require("../validations/updateMyEvent.validation");
const AppError = require("./../utils/appError.utils");
const catchAsync = require("./../utils/catchAsync.utils");
const { errorCodes } = require("./../utils/constants.utils");

exports.getMyEvents = catchAsync(async (req, res, next) => {
  const myHostedEvents = await getMyHostedEvents(req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      message: "My hosted events fetched successfully",
      myHostedEvents,
    },
  });
});

exports.createMyEvent = catchAsync(async (req, res, next) => {
  const { error } = createMyEventBodyValidation(req.body);
  if (error) {
    throw new AppError(
      error.details[0].message,
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  const myEvent = await hostNewEvent(
    req.body.name,
    req.body.description,
    req.body.date,
    req.body.location,
    req.body.image,
    req.body.limit,
    req.body.price,
    req.user._id
  );

  res.status(201).json({
    status: "success",
    data: {
      message: "Event created successfully",
      myEvent,
    },
  });
});

exports.updateMyEvent = catchAsync(async (req, res, next) => {
  const { error } = updateMyEventBodyValidation(req.body);
  if (error) {
    throw new AppError(
      error.details[0].message,
      400,
      errorCodes.INPUT_PARAMS_INVALID
    );
  }

  const myEvent = await updateMyEventDetails(
    req.params.eventId,
    req.body.name,
    req.body.description,
    req.body.date,
    req.body.location,
    req.body.image,
    req.body.limit,
    req.body.price,
    req.user._id
  );

  res.status(200).json({
    status: "success",
    data: {
      message: "Event updated successfully",
      myEvent,
    },
  });
});

exports.deleteMyEvent = catchAsync(async (req, res, next) => {
  const myEventId = await deleteMyHostedEvent(req.params.eventId, req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      message: "Event deleted successfully",
      myEventId,
    },
  });
});

exports.getMyEventRegistrations = catchAsync(async (req, res, next) => {
  const myEventRegistrations = await getMyHostedEventRegistrations(
    req.params.eventId,
    req.user._id
  );
  
  res.status(200).json({
    status: "success",
    data: {
      message: "My event registrations fetched successfully",
      myEventRegistrations,
    },
  });
});
