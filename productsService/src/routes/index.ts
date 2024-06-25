import express from "express"
import {
  createProductController,
  getListAllProductsController,
  getOneProductController,
  getProductDetailsController,
  updateProductController,
} from "../controllers"
import {
  createProductSchema,
  productDetailsSchema,
  updateProductSchema,
} from "../validation/products"
import validator, { ValidationSource } from "../helpers/validatorSchema"

export const productRouter = express()

// GET request
// list all products
productRouter.get("/products", getListAllProductsController)

// list product by category and filter form
productRouter.get("/product", getOneProductController)

// list product details
productRouter.get(
  "/product/:id",
  validator(productDetailsSchema, ValidationSource["PARAM"]),
  getProductDetailsController
)

// POST request
// create a new product
productRouter.post(
  "/product",
  validator(createProductSchema, ValidationSource["BODY"]),
  createProductController
)

// PUT request
// update a product

productRouter.put(
  "/product",
  validator(updateProductSchema, ValidationSource["BODY"]),
  updateProductController
)

// DELETE request
// delete a product
productRouter.delete("/product", updateProductController)
