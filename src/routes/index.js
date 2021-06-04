import express from "express";
const router = express.Router();
import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/schema.js";

var root = {
  hello: () => {
    return "Hello world!";
  },
};


router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
  })
);

export default router;
