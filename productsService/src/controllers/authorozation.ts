import { providedTokenSchema } from "../validation/auth/authorization"
import express from "express"
import { AuthFailureError } from "../core/apiError"
import { JWT } from "../core/jwt"
import validator, { ValidationSource } from "../helpers/validatorSchema"
import { asyncFunction } from "../helpers"

const router = express.Router()

router.use(
  "/",
  validator(providedTokenSchema, ValidationSource.HEADER),
  asyncFunction(async (req, res, next) => {
    try {
      const authorization = req.headers.authorization
      const token = getAccessToken(authorization)
      const decodeToken = await JWT.validate(token)
      next()
    } catch (error) {
      console.log("error", error)
      throw new AuthFailureError("Invalid Authorization")
    }
  })
)

function getAccessToken(authorization?: string) {
  if (!authorization) throw new AuthFailureError("Invalid Authorization")
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization 2")
  return authorization.split(" ")[1]
}

export default router
