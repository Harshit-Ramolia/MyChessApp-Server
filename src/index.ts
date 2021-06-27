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
import MongoSessionStore from "connect-mongodb-session";

const main = async () => {
  console.log("Run ENV = ", process.env.NODE_ENV || "Development");
  const PORT = process.env.PORT || 8080;
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  if (IS_PROD) {
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
  } else {
    const MongoDBStore = MongoSessionStore(session);
    const store = new MongoDBStore({
      uri: process.env.MONGO_URL || "",
      collection: "sessionCacheStore",
      expires: 1 * 24 * 60 * 60 * 1000,
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 100,
        serverSelectionTimeoutMS: 10000,
      },
    });
    store.on("error", function (error: any) {
      console.error(new Error(`Error in Session`), error);
    });
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "secret",
        name: COOKIE_NAME,
        cookie: {
          maxAge: COOKIE_MAX_AGE,
          sameSite: "lax",
          httpOnly: true,
        },
        store: store,
        resave: false,
        saveUninitialized: false,
        rolling: true,
      })
    );
  }
  app.use(routes);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: Resolvers as NonEmptyArray<Function>,
      validate: false,
    }),
    subscriptions: {
      onConnect: () => {
        console.log("Connected!");
      },
      onDisconnect: () => {
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
