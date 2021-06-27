"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const findOrCreate = async (email, username) => {
    let user = await user_1.UserModel.findOne({ email }).exec();
    if (user)
        return user;
    user = await user_1.UserModel.create({ email, username, gameStatus: 0 });
    return user;
};
exports.default = findOrCreate;
//# sourceMappingURL=findOrCreate.js.map