import Joi from "joi"

export const JoiWithBearerToken = () =>
  Joi.string()
    .custom((value: string, helpers) => {
      if (value.split(" ")[0]?.toLocaleLowerCase() !== "bearer")
        return helpers.error("any.invalid")
      if (!value.split(" ")[1]) return helpers.error("any.invalid")
      return value
    }, "Authorization Header Validation")
    .options({ allowUnknown: true })

export const providedTokenSchema = Joi.object({
  authorization: JoiWithBearerToken(),
}).unknown(true)
