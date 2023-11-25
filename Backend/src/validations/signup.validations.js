const Joi = require("joi");

module.exports = {
  signupBodyValidation: (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(body);
  },
};
