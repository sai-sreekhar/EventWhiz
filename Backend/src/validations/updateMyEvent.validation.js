const Joi = require("joi");

module.exports = {
  updateMyEventBodyValidation: (body) => {
    const schema = Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      date: Joi.date().timestamp(),
      location: Joi.string(),
      image: Joi.string(),
      limit: Joi.number(),
      price: Joi.number(),
    });
    return schema.validate(body);
  },
};
