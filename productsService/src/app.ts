import dotenv from "dotenv"
dotenv.config()

import authorizationMiddleware from "./controllers/authorozation"
import express from "express"
import { Response } from "express"

import { errorMiddleWare } from "./middelwares/errorMidellware"
import "./database"
import { productRouter } from "./routes"

const app = express()

app.use(express.json({ limit: "10mb" }))

app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
)

app.get("/productsService", (_: any, res: Response) => {
  res.send("Hello from productsService")
})

app.use(authorizationMiddleware)

app.use(productRouter)

app.use(errorMiddleWare)

export { app }
