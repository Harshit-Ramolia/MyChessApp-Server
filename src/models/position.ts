import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, Int, ObjectType } from "type-graphql";
import { Position } from "chessboardjsx";
import MyPosition from "./positionType";


@ObjectType()
export class PositionClass extends TimeStamps {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => PositionClass,{ nullable: true })
  @prop({ ref: () => PositionClass })
  public next: Ref<PositionClass>;

  @Field(() => MyPosition)
  @prop()
  public position: MyPosition;
}

export const PositionModel = getModelForClass(PositionClass);
