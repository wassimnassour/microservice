import { promisify } from "util"
import { sign, JwtPayload, verify, SignOptions } from "jsonwebtoken"
import { tokenInfo } from "../config"

interface IJwtPayload extends JwtPayload {
  user: string
}

const options: SignOptions = {
  algorithm: "HS256",
}

const encode = async (payload: IJwtPayload): Promise<string> => {
  //   @ts-ignore
  return promisify(sign)(
    {
      refreshTokenValidity: tokenInfo.refreshTokenValidity,
      accessTokenValidity: tokenInfo.accessTokenValidity,
      issuer: tokenInfo.issuer,
      audience: tokenInfo.audience,
      ...payload,
    },
    tokenInfo.secretKey as any,
    // @ts-ignore
    options as SignOptions
  )
}

type ValidateResponse<T> = T extends {} ? { [k in keyof T]: string } : never

const validate = async (
  token: string
): Promise<ValidateResponse<IJwtPayload>> => {
  // @ts-ignore
  return await promisify(verify)(token, tokenInfo.secretKey)
}

const createTokens = async (userId: any) => {
  const token = await encode({ user: userId })
  const refreshToken = await encode({ user: userId })
  return {
    token,
    refreshToken,
  }
}

export const JWT = { createTokens, encode, validate }
