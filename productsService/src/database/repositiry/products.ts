import { ObjectId } from "mongoose"
import Product, { ProductsModel } from "../model/product"
import { BadRequestError } from "../../core/apiError"

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

const updateProduct = async (
  productId: string,
  newProduct: Partial<Product>
) => {
  const product = await ProductsModel.findOne({ _id: productId }).exec()

  if (!product) throw new BadRequestError("Product not found")
  const keys = Object.keys(newProduct) as (keyof Product)[]
  keys.forEach((key) => {
    if (
      product[key] != undefined &&
      key in product &&
      newProduct[key as keyof Product] !== undefined
    ) {
      // @ts-ignore
      product[key] = newProduct[key]
    }
  })

  await product?.save()

  return product
}

const deleteProduct = async (productId: string) => {
  const product = await ProductsModel.deleteOne({ _id: productId }).exec()
  return product
}

export {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
}
