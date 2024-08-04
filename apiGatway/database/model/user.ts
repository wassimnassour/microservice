import { Schema, Types, model } from "mongoose"

export default interface IUser {
  _id: Types.ObjectId
  name?: string
  profilePicUrl?: string
  email?: string
  password?: string
  verified?: boolean
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const user = new Schema<IUser>({
  _id: Types.ObjectId,
  name: Schema.Types.String,
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
  },
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date,
  password: {
    type: Schema.Types.String,
    required: true,
  },
  profilePicUrl: Schema.Types.String,
  verified: Schema.Types.Boolean,
  status: Schema.Types.Boolean,
})

export const UserModel = model("user", user)
