import Role from "./role"
import { Schema, Types, model } from "mongoose"

export default interface User {
  _id: Types.ObjectId
  name?: string
  profilePicUrl?: string
  email?: string
  password?: string
  roles: Role[]
  verified?: boolean
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const user = new Schema<User>({
  name: Schema.Types.String,
  email: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  password: Schema.Types.String,
  roles: [Schema.Types.String],
  status: Schema.Types.Boolean,
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date,
})

export const UserModel = model("uses", user)
