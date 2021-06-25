import express from "express";
import routes from "./routes";
import "./config/mongoose";
import cors from "cors";
import session from "express-session";
import { buildSchema, NonEmptyArray } from "type-graphql";
import { COOKIE_MAX_AGE, COOKIE_NAME, IS_PROD } from "./config/constants";
import { Resolvers } from "./resolvers/index";
import "./util/dotenv";
import { MyContext } from "./types";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";

const main = async () => {
  console.log("Run ENV = ", process.env.NODE_ENV || "Development");
  const PORT = process.env.PORT || 8080;
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        sameSite: "lax",
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        secure: IS_PROD,
      },
    })
  );
  app.use(routes);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: Resolvers as NonEmptyArray<Function>,
      validate: false,
    }),
    subscriptions: {
      onConnect: (connectionParams, webSocket, context) => {
        console.log("Connected!");
      },
      onDisconnect: (webSocket, context) => {
        console.log("Disconnected!");
      },
    },
    context: ({ req, res }: MyContext) => ({
      req,
      res,
    }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const ws = createServer(app);
  apolloServer.installSubscriptionHandlers(ws);
  ws.listen(PORT, async () => {
    console.log(`Server is running on port : ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
