"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const constants_1 = require("../config/constants");
const client = new google_auth_library_1.OAuth2Client(constants_1.GOOGLE_CLIENT_ID);
const googleVerification = async (token) => {
    let payload = null;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: constants_1.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
        if (payload === null || payload === void 0 ? void 0 : payload.email_verified)
            return { email: payload.email, username: payload.name, error: false };
        else
            return { error: true };
    }
    catch (_) {
        return { error: true };
    }
};
exports.default = googleVerification;
//# sourceMappingURL=googleVerification.js.map