const AppError = require("./appError.utils");
const { errorCodes } = require("./constants.utils");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      if (err instanceof AppError) {
        next(err);
      } else {
        const message = `Exception: ${err}`;
        console.log(message);
        next(new AppError(message, 500, errorCodes.EXCEPTION));
      }
    });
  };
};
