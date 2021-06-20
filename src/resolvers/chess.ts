import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import "reflect-metadata";
import { UserModel, UserClass } from "../models/user";
import argon2 from "argon2";
import { MyContext } from "../types";
import { ChessClass, ChessModel } from "../models/chess";

@Resolver()
export class ChessResolver {
  @Query(() => ChessClass)
  async createNewChess(@Ctx() { req }: MyContext) {
    if (!req.session.user?.id) {
      return null;
    }
    return await ChessModel.create({}).exec();
  }
}
