import { UserResolver } from "./user";
import { ChessResolver } from "./chess";

export const Resolvers = [UserResolver, ChessResolver] as const;
