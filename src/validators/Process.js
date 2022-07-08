import Joi from "joi";

export const ProcessValidator = Joi.object({
  ergistro: Joi.string().required(),
  apelido: Joi.string(),
});
