import express from "express"
import asyncFunction from "../../helpers"
import { loginController, singUpController } from "../../controllers/auth"
import validator, { ValidationSource } from "../../helpers/validatorSchema"
import {
  loginCredentialSchema,
  signUpCredentialSchema,
} from "../../validation/auth"

export const authRouter = express()

authRouter.post(
  "/login",
  validator(loginCredentialSchema, ValidationSource["BODY"]),
  loginController
)

authRouter.post(
  "/signup",
  validator(signUpCredentialSchema, ValidationSource["BODY"]),
  singUpController
)
