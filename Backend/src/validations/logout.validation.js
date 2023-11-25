const Joi = require("joi");

module.exports = {
  logoutBodyValidation: (body) => {
    const schema = Joi.object({
      accessToken: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
