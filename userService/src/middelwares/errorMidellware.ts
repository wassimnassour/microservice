import { NextFunction, Response, Request } from "express"
import { ApiError } from "../core/apiError"

export const errorMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Hello from server Error", err)
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
  } else {
    console.log(err.message)
    res.send("Something went wrong")
  }
}
