import Joi from "joi";

export const ProcessValidator = Joi.object({
  registro: Joi.string().required(),
  apelido: Joi.string().allow(null, ""),
});

export const ProcessEditValidator = Joi.object({
  _id: Joi.string().required(),
  registro: Joi.string().allow(null, ""),
  apelido: Joi.string().allow(null),
  updatedAt: Joi.string().allow(null,'')
});