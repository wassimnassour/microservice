import { BadRequestError } from "../core/apiError"
import * as productsRepo from "../database/repositiry/products"
import { asyncFunction } from "../helpers"

export const getListAllProductsController = asyncFunction(async (req, res) => {
  res.send("list all PRODUCTs")
})

export const getOneProductController = asyncFunction(async (req, res) => {
  res.send("list getOneProductController")
})

export const getProductDetailsController = asyncFunction(async (req, res) => {
  try {
    const product = await productsRepo.getProductDetails(
      req.params?.id as string
    )
    res.send(product)
  } catch (error) {
    throw new BadRequestError("Error getting product details")
  }
})

export const createProductController = asyncFunction(async (req, res) => {
  try {
    const product = await productsRepo.createProduct(req.body)
    if (!product) return new BadRequestError("Error creating product")
    res.status(201).send(product)
  } catch (error) {
    return new BadRequestError("Error creating product")
  }
})

export const updateProductController = asyncFunction(async (req, res) => {
  res.send("list createProductController")
})

export const deleteProductController = asyncFunction(async (req, res) => {
  res.send("list deleteProductController")
})
