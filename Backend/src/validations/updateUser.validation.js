const Joi = require("joi");

module.exports = {
  updateUserDetailsBodyValidation: (body) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      contact: Joi.string().pattern(/^\d{10}$/),
    });
    return schema.validate(body);
  },
};
