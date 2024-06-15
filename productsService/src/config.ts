export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
  secretKey: process.env.JWT_SECRET || "",
}

// Mapper for environment variables
export const environment = process.env.NODE_ENV
export const port = process.env.PORT
export const timezone = process.env.TZ
