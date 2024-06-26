import { BadRequestError } from "../core/apiError"
import { SuccessMsgResponse } from "../core/apiResponse"
import * as productsRepo from "../database/repositiry/products"
import { asyncFunction } from "../helpers"

export const getListAllProductsController = asyncFunction(async (req, res) => {
  const products = await productsRepo.getAllProducts()
  res.send(products)
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
    throw new BadRequestError("Error creating product")
  }
})

export const updateProductController = asyncFunction(async (req, res) => {
  try {
    const isUpdated = await productsRepo.updateProduct(req.body.id, req.body)
    console.log("req.body", req.body)

    if (!isUpdated) return new BadRequestError("Error updating product")
    res.send(isUpdated)
  } catch (error: any) {
    console.log("error", error?.message)
    throw new BadRequestError(`Error updating product: ${error?.message}`)
  }
})

export const deleteProductController = asyncFunction(async (req, res, next) => {
  try {
    const product = await productsRepo.deleteProduct(req.params.id)
    if (product.deletedCount === 1) {
      new SuccessMsgResponse("product deleted successfully").send(res)
    } else {
      throw new BadRequestError("Error deleting product")
    }
  } catch (error) {
    // throw new BadRequestError("Error deleting product")
    next(new BadRequestError("Error deleting product"))
  }
})
