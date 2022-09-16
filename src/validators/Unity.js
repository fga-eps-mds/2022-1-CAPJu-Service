import Joi from "joi";

export const UnityValidator = Joi.object({
  name: Joi.string().required(),
  deleted: Joi.boolean(),
});
