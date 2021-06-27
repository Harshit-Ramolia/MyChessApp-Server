"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invitations_1 = require("../models/invitations");
const user_1 = require("../models/user");
const Invite = async (req, friendID) => {
    var _a;
    if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
        return null;
    }
    const newInvitation = await invitations_1.InvitationModel.create({
        host: req.session.user.id,
        friend: friendID,
    });
    if (!newInvitation) {
        return null;
    }
    else {
        await user_1.UserModel.findOneAndUpdate({ _id: req.session.user.id }, { gameStatus: 1 });
        return newInvitation;
    }
};
exports.default = Invite;
//# sourceMappingURL=invite.js.map