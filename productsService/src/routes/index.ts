import express from "express"
import {
  createProductController,
  getListAllProductsController,
  getOneProductController,
  getProductDetailsController,
  updateProductController,
} from "../controllers"

export const productRouter = express()

// GET request
// list all products
productRouter.get("/products", getListAllProductsController)

// list product by category and filter form
productRouter.get("/product", getOneProductController)

// list product details
productRouter.get("/product", getProductDetailsController)

// POST request
// create a new product
productRouter.post("/product", createProductController)

// PUT request
// update a product

productRouter.put("/product", updateProductController)

// DELETE request
// delete a product
productRouter.delete("/product", updateProductController)
