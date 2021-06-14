import express from "express";
import routes from "./routes";
import "./config/mongoose";
import cors from "cors";
import session from "express-session";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, NonEmptyArray } from "type-graphql";
import { IS_PROD } from "./config/constants";
import { Resolvers } from "./resolvers/index";

const main = async () => {
  console.log("Run ENV = ", process.env.NODE_ENV || "Development");
  const PORT = process.env.PORT || 8080;
  const app = express();

  app.use(
    "/data",
    graphqlHTTP(async (req, res) => {
      return {
        schema: await buildSchema({
          resolvers: Resolvers as NonEmptyArray<Function>,
          validate: false,
        }),
        graphiql: !IS_PROD,
        // context: () => ({UserModel}),
      };
    })
  );

  app.use(express.json());
  app.use(cors({ origin: "*", credentials: true }));
  app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
  app.use(routes);

  app.listen(PORT, () => {
    console.log(`Server connected at port : ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
