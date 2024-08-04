import { Request } from "express"
import User from "../database/models/user"
import { roles } from "../constants/roles"

declare global {
  namespace Express {
    export interface Request {
      user?: User | null
      roles?: Partial<typeof roles>[keyof typeof roles][]
    }
  }
}
