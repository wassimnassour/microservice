import { Response } from "express"
import dotenv from "dotenv"
dotenv.config()

import express from "express"

const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
)

app.get("/userService", (_: any, res: Response) => {
  res.send("hello from userService")
})

// app.use((req, res, next) => next(new NotFoundError()))

export { app }
