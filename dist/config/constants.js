"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_CLIENT_ID = exports.COOKIE_MAX_AGE = exports.COOKIE_NAME = exports.IS_PROD = void 0;
require("../util/dotenv");
exports.IS_PROD = process.env.NODE_ENV === "production";
exports.COOKIE_NAME = "Chess_0101";
exports.COOKIE_MAX_AGE = 365 * 1 * 24 * 60 * 60 * 1000;
exports.GOOGLE_CLIENT_ID = process.env.google_client_id;
//# sourceMappingURL=constants.js.map