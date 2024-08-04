const { UserModel } = require("../model/user")

const findUserById = async (id: string | undefined) => {
  const user = await UserModel.findById({
    _id: id,
  })

  return user
}

export { findUserById }
