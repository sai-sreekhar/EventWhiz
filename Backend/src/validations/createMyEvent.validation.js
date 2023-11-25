const Joi = require("joi");

module.exports = {
  createMyEventBodyValidation: (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().timestamp().required(),
      location: Joi.string().required(),
      image: Joi.string().required(),
      limit: Joi.number().required(),
      price: Joi.number().required(),
    });
    return schema.validate(body);
  },
};
