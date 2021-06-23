import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PositionClass extends TimeStamps {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => PositionClass, { nullable: true })
  @prop({ ref: () => PositionClass })
  public next: Ref<PositionClass>;

  @Field(() => String, { nullable: true })
  @prop()
  public data: string;
}

export const PositionModel = getModelForClass(PositionClass);
