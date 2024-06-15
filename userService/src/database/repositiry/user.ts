import { UserModel } from "../model/user"

export const findUserByEmail = async (email: string) => {
  return await UserModel.find({
    email: email,
  })
}
