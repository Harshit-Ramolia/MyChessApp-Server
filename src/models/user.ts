import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserClass extends TimeStamps {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  @prop()
  public username?: string;

  @Field({ nullable: true })
  @prop({ match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })
  public email?: string;

  @Field()
  @prop({ defaultValue: 0 })
  public gameStatus: 0 | 1 | 2;

  @Field({ nullable: true })
  @prop()
  public currentGame: string;
}

export const UserModel = getModelForClass(UserClass);
