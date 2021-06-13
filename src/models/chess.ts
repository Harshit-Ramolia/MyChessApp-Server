import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class ChessClass extends TimeStamps {
  // @prop({ref})
  // public host: string;
}

export const UserModel = getModelForClass(ChessClass);
