import Joi from "joi";

export const StageValidator = Joi.object({
  name: Joi.string().required(),
  time: Joi.string().required(),
  deleted: Joi.boolean(),
});
