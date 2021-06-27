"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("./config/mongoose");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./config/constants");
const index_1 = require("./resolvers/index");
require("./util/dotenv");
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const main = async () => {
    console.log("Run ENV = ", process.env.NODE_ENV || "Development");
    const PORT = process.env.PORT || 8080;
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default({ origin: "http://localhost:3000", credentials: true }));
    app.use(express_session_1.default({
        secret: process.env.SESSION_SECRET || "secret",
        name: constants_1.COOKIE_NAME,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            sameSite: "lax",
            httpOnly: true,
            maxAge: constants_1.COOKIE_MAX_AGE,
            secure: constants_1.IS_PROD,
        },
    }));
    app.use(routes_1.default);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: index_1.Resolvers,
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
        context: ({ req, res }) => ({
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
    const ws = http_1.createServer(app);
    apolloServer.installSubscriptionHandlers(ws);
    ws.listen(PORT, async () => {
        console.log(`Server is running on port : ${PORT}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map