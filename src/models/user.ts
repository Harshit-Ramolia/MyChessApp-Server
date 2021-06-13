import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserClass extends TimeStamps {
  
  @Field()
  @prop({ minlength: 3,     validate: {
    validator: (v) => {
      return !v.include('@');
    },
    message: 'Must not include @'
  } })
  public username: string;

  @Field()
  @prop({ match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })
  public email: string;

  @Field()
  @prop()
  public password: string;
}

export const UserModel = getModelForClass(UserClass);
