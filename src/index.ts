import express from "express";
import routes from "./routes";
import "./config/mongoose";
import cors from "cors";
import session from "express-session";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, NonEmptyArray } from "type-graphql";
import { COOKIE_MAX_AGE, COOKIE_NAME, IS_PROD } from "./config/constants";
import { Resolvers } from "./resolvers/index";
import "./util/dotenv";

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
  app.use(
    "/graphql",
    graphqlHTTP(async (req, res) => {
      return {
        schema: await buildSchema({
          resolvers: Resolvers as NonEmptyArray<Function>,
          validate: false,
        }),
        graphiql: !IS_PROD,
        context: { req, res },
      };
    })
  );

  app.listen(PORT, () => {
    console.log(`Server connected at port : ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
