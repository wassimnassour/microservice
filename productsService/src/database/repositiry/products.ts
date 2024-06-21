import { ObjectId } from "mongoose"
import Product, { ProductsModel } from "../model/product"

const createProduct = async (product: Product) => {
  const createdProduct = new ProductsModel(product)
  await createdProduct.save()
  return createdProduct
}

const getProductDetails = async (productId: string) => {
  const product = ProductsModel.findOne({ _id: productId })
  return product
}

const getAllProducts = async () => {
  const products = ProductsModel.find()
  return products
}

export { createProduct, getAllProducts, getProductDetails }
