const Joi = require("joi");

module.exports = {
  getAwsS3SignedUrlforUploadBodyValidation: (body) => {
    const schema = Joi.object({
      type: Joi.number().required(),
      eventId: Joi.string(),
    });
    return schema.validate(body);
  },
};
