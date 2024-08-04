import express, { NextFunction, Request, Response } from "express"
import validator, { ValidationSource } from "../helpers/validatorSchema"
import { providedTokenSchema } from "../validation/auth/authorization"
import { AuthFailureError, BadTokenError } from "../core/apiError"
import { JWT } from "../core/jwt"
import { asyncFunction } from "../helpers/asyncFunction"
import * as userRepo from "../database/repository/user"

const router = express.Router()

router.use(
  "/",
  validator(providedTokenSchema, ValidationSource.HEADER),
  asyncFunction(async (req, _, next: NextFunction) => {
    const authorization = getAccessToken(req.headers.authorization)

    const tokenData = await JWT.validate(authorization)

    const user = await userRepo.findUserById(tokenData.sub)

    console.log("user", user)

    req.user = user && user[0]

    if (user && user.length === 0) {
      throw new BadTokenError()
    }
    next()
  })
)

function getAccessToken(authorization?: string) {
  if (!authorization) throw new AuthFailureError("Invalid Authorization")
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization")
  return authorization.split(" ")[1]
}

export default router
