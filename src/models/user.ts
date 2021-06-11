import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";

class UserClass {
  @prop()
  public name?: string;

  public static async findByName(this: ReturnModelType<typeof UserClass>, name: string) {
    return this.find({ name }).exec();
  }
}



export const UserModel = getModelForClass(UserClass);


