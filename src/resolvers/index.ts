import { UserResolver } from "./user";
import { ChessResolver } from "./chess";
import { InvitationResolver } from "./invitation";

export const Resolvers = [UserResolver, ChessResolver, InvitationResolver] as const;
