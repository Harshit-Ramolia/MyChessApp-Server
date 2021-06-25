import { InvitationClass, InvitationModel } from "../models/invitations";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { MyContext } from "../types";
import { UserModel } from "../models/user";
import { ChessClass, ChessModel } from "../models/chess";

@Resolver(InvitationClass)
export class InvitationResolver {
  @Query(() => [InvitationClass], { nullable: true })
  async invitationsOfUser(@Ctx() { req }: MyContext) {
    if (!req.session.user?.id) {
      return null;
    } else {
      return await InvitationModel.find({ friend: req.session.user.id }).exec();
    }
  }

  @FieldResolver()
  async host(@Root() invitationInstance: InvitationClass) {
    return await UserModel.findOne({
      _id: invitationInstance._doc.host,
    }).exec();
  }

  @FieldResolver()
  async friend(@Root() invitationInstance: InvitationClass) {
    return await UserModel.findOne({
      _id: invitationInstance._doc.friend,
    }).exec();
  }

  @Mutation(() => Boolean)
  async cancelInvitation(@Ctx() { req }: MyContext) {
    if (!req.session.user?.id) {
      return false;
    } else {
      try {
        await InvitationModel.deleteMany({ host: req.session.user.id });
        await UserModel.findOneAndUpdate(
          { _id: req.session.user.id },
          { gameStatus: 0 }
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  @Mutation(() => Boolean)
  async acceptInvitation(
    @Arg("hostID") hostID: string,
    @Ctx() { req }: MyContext
    @PubSub() pubSub: PubSubEngine
  ) {
    if (!req.session.user?.id) {
      return false;
    } else {
      try {
        let newChess: ChessClass = await ChessModel.create({
          white: hostID,
          black: req.session.user.id,
          isGameRunning: true,
        });
        await UserModel.findOneAndUpdate(
          { _id: req.session.user.id },
          { gameStatus: 2, currentGame: newChess._id }
        );
        await UserModel.findOneAndUpdate(
          { _id: hostID },
          { gameStatus: 2, currentGame: newChess._id }
        );
        await InvitationModel.deleteMany({
          friend: req.session.user.id,
        });
        await InvitationModel.deleteMany({
          host: hostID,
        });
        const payload = {id:hostID};
        await pubSub.publish("gameStarted", payload);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  @Subscription({
    topics: "gameStarted",
    filter: ({ payload, args }) => {
      return payload.id.toString() == args.id;
    },
    nullable: true,
  })
  gameStarted(@Arg("id") id: string): boolean {
    return true;
  }

  @Subscription({
    topics: "newInvitation",
    filter: ({ payload, args }) => {
      return payload.friend.toString() == args.id;
    },
    nullable: true,
  })
  newInvitation(
    @Root() Invitation: InvitationClass,
    @Arg("id") id: string
  ): InvitationClass {
    return Invitation;
  }
}
