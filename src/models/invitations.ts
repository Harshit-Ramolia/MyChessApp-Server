import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";
import { UserClass } from "./user";

@ObjectType()
export class InvitationClass extends TimeStamps {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserClass)
  @prop({ ref: () => UserClass })
  public host: Ref<UserClass>;

  @Field(() => UserClass)
  @prop({ ref: () => UserClass })
  public friend: Ref<UserClass>;
}

export const InvitationModel = getModelForClass(InvitationClass);
