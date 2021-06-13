import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class UserClass extends TimeStamps {
  @prop()
  public username: string;

  @prop()
  public password: string;
}

export const UserModel = getModelForClass(UserClass);
