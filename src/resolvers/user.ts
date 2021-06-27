import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from "type-graphql";
import "reflect-metadata";
import { UserModel, UserClass } from "../models/user";
import { MyContext } from "../types";
import { FieldError } from "./FieldErrorType";
import googleVerification from "../util/googleVerification";
import findOrCreate from "../util/findOrCreate";
import { COOKIE_NAME } from "../config/constants";
import Invite from "../util/invite";
import { InvitationClass } from "../models/invitations";
import { ChessClass, ChessModel } from "../models/chess";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserClass, { nullable: true })
  user?: UserClass;
}

@Resolver()
export class UserResolver {
  @Query(() => UserClass, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (req.session.user?.id) {
      return UserModel.findOne({ _id: req.session.user.id }).exec();
    } else {
      return null;
    }
  }

  @Query(() => [UserClass])
  users() {
    return UserModel.find({}).exec();
  }

  @Query(() => UserClass, { nullable: true })
  userByID(@Arg("id") id: string): UserClass {
    return UserModel.findOne({ _id: id }).exec();
  }

  @Query(() => Int)
  async GameStatus(@Ctx() { req }: MyContext) {
    if (!req.session.user?.id) {
      return -1;
    } else {
      let user: UserClass = await UserModel.findOne({
        _id: req.session.user.id,
      }).exec();
      return user.gameStatus;
    }
  }

  @Query(() => ChessClass, { nullable: true })
  async currentGame(@Ctx() { req }: MyContext) {
    if (!req.session.user?.id) return null;
    const user: UserClass = await UserModel.findOne({
      _id: req.session.user.id,
    }).exec();
    if (!user || !user.currentGame) return null;
    let currentGame = await ChessModel.findOne({ _id: user.currentGame });
    if (!currentGame) return null;
    return currentGame;
  }

  @Mutation(() => UserResponse)
  async login(@Arg("token") token: string, @Ctx() { req }: MyContext) {
    let response = await googleVerification(token);
    let { email, username, error } = response;
    if (error || email == undefined || username == undefined) {
      return {
        errors: [
          {
            field: "google",
            message: "Invalid google token",
          },
        ],
      };
    } else {
      let user: UserClass = await findOrCreate(email, username);
      if (!user) {
        return {
          errors: [
            {
              field: "username",
              message: "Server Error",
            },
          ],
        };
      }

      req.session.user = { id: user._id };
      return { user };
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async invite(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    const user: UserClass = await UserModel.findOne({ email }).exec();
    if (!req.session.user?.id) {
      return {
        errors: [
          {
            field: "authentication",
            message: "User is not log in",
          },
        ],
      };
    }
    if (!user) {
      return {
        errors: [
          {
            field: "friend",
            message: "User is not a member of MYCHESSAPP",
          },
        ],
      };
    } else {
      if (user.gameStatus === 2) {
        return {
          errors: [
            {
              field: "friend",
              message: "User is already playing",
            },
          ],
        };
      }
      let newInvitation = await Invite(req, user._id);
      if (newInvitation === null) {
        return {
          errors: [
            {
              field: "friend",
              message: "Internal Server Error",
            },
          ],
        };
      }
      const payload: InvitationClass = newInvitation;
      await pubSub.publish("newInvitation", payload);
      return {};
    }
  }

  @Mutation(() => Number)
  async invalidateQuery(
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.user?.id) return -1;
    else {
      let user: UserClass = await UserModel.findOne({
        _id: req.session.user.id,
      }).exec();
      if (!user) return -1;
      else {
        return user.gameStatus;
      }
    }
  }
}
