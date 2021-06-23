import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import "reflect-metadata";
import { MyContext } from "../types";
import { ChessClass, ChessModel } from "../models/chess";
import { FieldError } from "./FieldError";

@ObjectType()
class ChessResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ChessClass, { nullable: true })
  chess?: ChessClass;
}

@Resolver()
export class ChessResolver {
  @Query(() => ChessResponse)
  async createNewChess(@Ctx() { req }: MyContext) {
      if (!req.session.user?.id) {
      return {
        errors: [
          {
            field: "authentication",
            message: "user must be log in to start the game",
          },
        ],
      };
    }
    let newChess = await ChessModel.create({white: req.session.user.id, black: req.session.user.id});
    return { chess: newChess };
  }
}
