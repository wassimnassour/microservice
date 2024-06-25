import { NextFunction, Response, Request } from "express"
import { ApiError } from "../core/apiError"

export const errorMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Hello from server Error", err, !!(err instanceof ApiError))

  if (err instanceof ApiError) {
    ApiError.handle(err, res)
  } else {
    res.send("Something went wrong")
  }
}
