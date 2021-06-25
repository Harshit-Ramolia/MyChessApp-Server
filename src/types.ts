import { Request, Response } from "express";
import { PubSubEngine } from "type-graphql";

export type MyContext = {
  req: Request;
  res: Response;
  pubSub: PubSubEngine;
};

export type MySession = {
  id: string;
};
