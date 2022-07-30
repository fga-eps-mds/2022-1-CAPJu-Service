import Joi from "joi";

export const FlowValidator = Joi.object({
  name: Joi.string().required(),
  stages: Joi.array().items(Joi.string()).required(),
  sequences: Joi.array()
    .items(
      Joi.object({
        from: Joi.string(),
        to: Joi.string(),
      })
    )
    .required(),
});

export const FlowEditValidator = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().allow(null, ""),
  stages: Joi.array().items(Joi.string()).allow(null),
  sequences: Joi.array()
    .items(
      Joi.object({
        from: Joi.string(),
        to: Joi.string(),
      })
    )
    .allow(null),
});
