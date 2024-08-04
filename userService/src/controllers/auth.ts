import bcrypt from "bcrypt"

import { BadRequestError } from "../core/apiError"
import { JWT } from "../core/jwt"
import { UserModel } from "../database/model/user"
import asyncFunction from "../helpers"
import * as userRepo from "../database/repositiry/user"

export const loginController = asyncFunction(async (req, res) => {
  const payload = req.body
  const user = await userRepo.findUserByEmail(payload.email)

  // finds is the emails already registered
  if (user.length == 0) {
    throw new BadRequestError("Email or password is incorrect")
  }

  // see is password the same as the password in the database
  const isPasswordTheSame = bcrypt.compare(
    user[0].password as string,
    payload.password
  )

  if (!isPasswordTheSame) {
    throw new BadRequestError("Email or password is incorrect")
  }

  const tokens = await JWT.createTokens(user[0]._id)
  console.log("verify token", await JWT.validate(tokens.token))

  res.send({
    user,
    ...tokens,
  })
})

export const singUpController = asyncFunction(async (req, res) => {
  const payload = req.body

  const isEmailAlreadyRegistered = await userRepo.findUserByEmail(payload.email)

  // finds is the emails already registered
  if (isEmailAlreadyRegistered.length > 0) {
    throw new BadRequestError("Email already registered")
  }
  // created hashed password
  const hashedPassword = await bcrypt.hash(payload.password, 10)

  // save user in database
  const user = await UserModel.create({ ...payload, password: hashedPassword })

  // generate new tokens and and send them to the client
  const tokens = await JWT.createTokens(user._id.toString())

  console.log("tokens", tokens)

  res.send({
    user,
    ...tokens,
  })
})
