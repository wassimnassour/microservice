import { Types } from "mongoose"

export enum RoleCode {
  WRITER = "CUSTOMER",
  EDITOR = "SELLER",
  ADMIN = "ADMIN",
}

export default interface Role {
  _id: Types.ObjectId
  code: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}
