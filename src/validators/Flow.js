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
