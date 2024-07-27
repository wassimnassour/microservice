const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

const productsServiceUrl = "http://localhost:8080/"

app.use(
  "/products",
  createProxyMiddleware({
    target: productsServiceUrl,
    changeOrigin: true,
  })
)

// Additional route
app.get("/", (req, res) => {
  res.send("Hello, this is the Express server!")
})

app.listen(3000, () => {
  console.log("Api Gateway is running on port 3000")
})
