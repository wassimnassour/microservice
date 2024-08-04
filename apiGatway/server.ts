import { asyncFunction } from "./helpers/asyncFunction"

const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

// TODO: need to implement service discovery
const productsServiceUrl = "http://localhost:8080/"
const authenticationServiceUrl = "http://localhost:4000/"
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

app.listen(3000, () => {
  console.log("Api Gateway is running on port 3000")
})
