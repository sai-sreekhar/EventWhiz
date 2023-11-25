const {
  getEventById,
  getAllEventsBriefInfo,
} = require("../services/events.service");
const AppError = require("./../utils/appError.utils");
const catchAsync = require("./../utils/catchAsync.utils");
const { errorCodes } = require("./../utils/constants.utils");

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await getAllEventsBriefInfo();
  res.status(200).json({
    status: "success",
    data: {
      message: "All Events fetched successfully",
      events
    },
  });
});

exports.getAnEvent = catchAsync(async (req, res, next) => {
  const eventInfo = await getEventById(req.params.eventId);
  res.status(200).json({
    status: "success",
    data: {
      message: "Event fetched successfully",
      eventInfo,
    },
  });
});
