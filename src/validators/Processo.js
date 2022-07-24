import Joi from "joi";

export const ProcessoValidator = Joi.object({
  registro: Joi.string().required(),
  apelido: Joi.string(),
});
