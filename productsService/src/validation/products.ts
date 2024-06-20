import Joi from "joi"
import Product from "../database/model/product"

export const createProductSchema = Joi.object<Product>({
  title: Joi.string().required(),
  description: Joi.string().max(20).required(),
  image: Joi.any().required(),
})

export const productDetailsSchema = Joi.object({
  id: Joi.string().required(),
})

export const deleteProductSchema = Joi.object<Product>({
  title: Joi.string().required(),
  description: Joi.string().max(20).required(),
  image: Joi.any().required(),
})

export const updateProductSchema = Joi.object<Product>({
  title: Joi.string(),
  description: Joi.string().max(20),
  image: Joi.any().required(),
})
