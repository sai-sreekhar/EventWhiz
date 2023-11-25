const Joi = require("joi");

module.exports = {
  loginBodyValidation: (body) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(body);
  },
};
