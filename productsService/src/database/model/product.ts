import { Schema, Types, model } from "mongoose"

export default interface Product {
  _id: Types.ObjectId
  title?: string
  image: string
  description?: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const product = new Schema<Product>({
  title: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: false,
  },
  description: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  status: Schema.Types.Boolean,
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date,
})

export const ProductsModel = model("products", product)
