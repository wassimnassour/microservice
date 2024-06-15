import Joi from "joi"

export const createProductSchema = Joi.object({
  title: Joi.string().email().required(),
  description: Joi.string().max(20).required(),
})
