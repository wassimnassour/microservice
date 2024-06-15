import express from "express"
import { Response } from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth"
import { errorMiddleWare } from "./middelwares/errorMidellware"
import "./database"

dotenv.config()

const app = express()

app.use(express.json({ limit: "10mb" }))

app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
)

app.get("/userService", (_: any, res: Response) => {
  res.send("hello from userService")
})

app.use("/", authRouter)

app.use(errorMiddleWare)

// app.use((req, res, next) => next(new NotFoundError()))

export { app }
