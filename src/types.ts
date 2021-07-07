import { Request, Response } from "express";
import { Session } from "express-session";
import { PubSubEngine } from "type-graphql";

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  pubSub: PubSubEngine;
};

export type MySession = {
  id: string;
};
