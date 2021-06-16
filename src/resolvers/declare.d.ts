import session from "express-session";
import { MySession } from "src/types";

declare module "express-session" {
  export interface SessionData {
    user: MySession;
  }
}
