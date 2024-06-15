import Joi from "joi"

export const loginCredentialSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(20).required(),
})

export const signUpCredentialSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(20).required(),
  name: Joi.string().max(20).required(),
})
