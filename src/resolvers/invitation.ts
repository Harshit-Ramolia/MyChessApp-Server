import { InvitationClass, InvitationModel } from "../models/invitations";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { MyContext } from "../types";
import { UserModel } from "../models/user";

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

  @Query(() => Boolean)
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

  @Query(() => Boolean)
  async acceptInvitation(
    @Arg("hostID") hostID: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.user?.id) {
      return false;
    } else {
      try {
        await UserModel.findOneAndUpdate(
          { _id: req.session.user.id },
          { gameStatus: 2 }
        );
        await UserModel.findOneAndUpdate({ _id: hostID }, { gameStatus: 2 });
        await InvitationModel.deleteMany({
          friend: req.session.user.id,
        });
        await InvitationModel.deleteMany({
          host: hostID,
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
