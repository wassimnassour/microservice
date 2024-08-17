import {
  authenticationServiceUrl,
  productsServiceUrl,
} from "./constants/services"
import { asyncFunction } from "./helpers/asyncFunction"
import { ErrorLogger, loggerAllRequests } from "./middelwares/logger"

const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

app.use((req: any, res: any, next: any) => {
  console.log(`Incoming request: ${req.method} ${req.url}`)
  next()
})

app.use(
  // express.json({ limit: "5mb" }),
  // express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 10000 }),
  loggerAllRequests
)

app.use(
  "/products",
  createProxyMiddleware({
    target: productsServiceUrl,
    changeOrigin: true,
  })
)
app.use(
  "/auth",
  createProxyMiddleware({
    target: authenticationServiceUrl,
    changeOrigin: true,
  })
)

// Additional route
app.get(
  "/",
  asyncFunction(async (req, res) => {
    res.send("Hello, this is the Express server!")
  })
)

console.log("🛑 HEHEHEH")
app.use(ErrorLogger)
app.listen(3000, () => {
  console.log("Api Gateway is running on port 3000")
})
