import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import "reflect-metadata";
import { MyContext } from "../types";
import { ChessClass, ChessModel } from "../models/chess";
import { FieldError } from "./FieldError";
import { UserModel } from "../models/user";
import { ShortMove } from "chess.js";

@ObjectType()
class ChessResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => ChessClass, { nullable: true })
  chess?: ChessClass;
}

interface MovePayload {
  id: string;
  position: string;
  move: string;
}

@Resolver(ChessClass)
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
    let newChess = await ChessModel.create({
      white: req.session.user.id,
      black: req.session.user.id,
    });
    return { chess: newChess };
  }

  @Query(() => [ChessClass])
  async allChess() {
    return await ChessModel.find({}).exec();
  }

  @Mutation(() => Boolean)
  async saveMove(
    @Arg("chessID") chessID: string,
    @Arg("position") position: string,
    @Arg("move") move: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    if (!req.session.user?.id) return false;
    const chess: ChessClass = await ChessModel.findOne({ _id: chessID }).exec();
    if (!chess) return false;
    let payload: MovePayload = { position, id: "", move };
    if (chess.white?.toString() === req.session.user.id)
      payload = { ...payload, id: chess.black?.toString() || "" };
    else if (chess.black?.toString() === req.session.user.id)
      payload = { ...payload, id: chess.white?.toString() || "" };
    else {
      return false;
    }
    await pubSub.publish("move", payload);
    return true;
  }

  @Subscription({
    topics: "move",
    filter: ({ payload, args }) => {
      return payload.id.toString() == args.id;
    },
    nullable: true,
  })
  move(@Root() movePayload: MovePayload, @Arg("id") id: string): string {
    return movePayload.move;
  }

  @Mutation(() => Boolean)
  async endGame(@Arg("chessID") chessID: string) {
    try {
      let chess: ChessClass = await ChessModel.findOneAndUpdate(
        { _id: chessID },
        { isGameRunning: false }
      ).exec();
      if (!chess) return false;
      await UserModel.findOneAndUpdate(
        { _id: chess.white },
        { gameStatus: 0, currentGame: null }
      );
      await UserModel.findOneAndUpdate(
        { _id: chess.black },
        { gameStatus: 0, currentGame: null }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @FieldResolver()
  async white(@Root() chessInstance: ChessClass) {
    return await UserModel.findOne({ _id: chessInstance._doc.white }).exec();
  }

  @FieldResolver()
  async black(@Root() chessInstance: ChessClass) {
    return await UserModel.findOne({ _id: chessInstance._doc.black }).exec();
  }
}
