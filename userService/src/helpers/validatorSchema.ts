import { Request, Response, NextFunction } from "express"
import Joi from "joi"
import { BadRequestError } from "../core/apiError"
// import { BadRequestError, ForbiddenError } from "../core/apiError"
// import { Types } from "mongoose"

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

// export const JoiObjectId = () =>
//   Joi.string().custom((value: string, helpers) => {
//     if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid")
//     return value
//   }, "Object Id Validation")

export const JoiWithBearerToken = () =>
  Joi.string()
    .custom((value: string, helpers) => {
      console.log("value.split", value.split(" "))
      if (value.split(" ")[0]?.toLocaleLowerCase() !== "bearer")
        return helpers.error("any.invalid")
      if (!value.split(" ")[1]) return helpers.error("any.invalid")
      return value
    }, "Authorization Header Validation")
    .options({ allowUnknown: true })

export default function validator(
  schema: Joi.AnySchema,
  source: ValidationSource = ValidationSource["BODY"]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { ...error } = schema.validate(req[source])

    if (!error.error) return next()

    throw new BadRequestError(
      error.error?.details?.map((i) => i.message).join(",")
    )
  }
}
