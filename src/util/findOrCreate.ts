import { UserModel } from "../models/user";

const findOrCreate = async (email: string, username: string) => {
  let user = await UserModel.findOne({ email }).exec();
  if (user) return user;

  user = await UserModel.create({ email, username, gameStatus:0 });
  return user;
};

export default findOrCreate;