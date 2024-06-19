import { asyncFunction } from "../helpers"

export const getListAllProductsController = asyncFunction(async (req, res) => {
  res.send("list all PRODUCTs")
})

export const getOneProductController = asyncFunction(async (req, res) => {
  res.send("list getOneProductController")
})

export const getProductDetailsController = asyncFunction(async (req, res) => {
  res.send("list getProductDetailsController")
})

export const createProductController = asyncFunction(async (req, res) => {
  res.send("list createProductController")
})

export const updateProductController = asyncFunction(async (req, res) => {
  res.send("list createProductController")
})

export const deleteProductController = asyncFunction(async (req, res) => {
  res.send("list deleteProductController")
})
