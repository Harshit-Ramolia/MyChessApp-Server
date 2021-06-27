"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../util/dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100,
    useFindAndModify: false,
    autoIndex: !constants_1.IS_PROD,
    useCreateIndex: true,
};
mongoose_1.default.connect(process.env.MONGO_URL || "", options);
const db = mongoose_1.default.connection;
db.on("error", (err) => {
    console.error(new Error("Could not connect to database"), err);
});
db.once("open", () => {
    console.info(`Database Connected`);
});
//# sourceMappingURL=mongoose.js.map