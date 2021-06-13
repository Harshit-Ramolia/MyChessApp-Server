import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class ChessClass extends TimeStamps {
  // @prop()
  // public host: string;
}

export const ChessModel = getModelForClass(ChessClass);
