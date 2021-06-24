import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { PositionClass } from "./position";
import { UserClass } from "./user";

@ObjectType()
export class ChessClass extends TimeStamps {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserClass)
  @prop({ ref: () => UserClass })
  public white: Ref<UserClass>;

  @Field(() => UserClass)
  @prop({ ref: () => UserClass })
  public black: Ref<UserClass>;

  @Field(() => PositionClass, { nullable: true })
  @prop({ ref: () => PositionClass })
  public firstPosition: Ref<PositionClass>;
  
  _doc: any;
}

export const ChessModel = getModelForClass(ChessClass);
