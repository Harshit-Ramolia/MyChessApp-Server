"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const user_1 = require("../models/user");
const FieldErrorType_1 = require("./FieldErrorType");
const googleVerification_1 = __importDefault(require("../util/googleVerification"));
const findOrCreate_1 = __importDefault(require("../util/findOrCreate"));
const constants_1 = require("../config/constants");
const invite_1 = __importDefault(require("../util/invite"));
const chess_1 = require("../models/chess");
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldErrorType_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => user_1.UserClass, { nullable: true }),
    __metadata("design:type", user_1.UserClass)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    async me({ req }) {
        var _a;
        if ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id) {
            return user_1.UserModel.findOne({ _id: req.session.user.id }).exec();
        }
        else {
            return null;
        }
    }
    users() {
        return user_1.UserModel.find({}).exec();
    }
    userByID(id) {
        return user_1.UserModel.findOne({ _id: id }).exec();
    }
    async GameStatus({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return -1;
        }
        else {
            let user = await user_1.UserModel.findOne({
                _id: req.session.user.id,
            }).exec();
            return user.gameStatus;
        }
    }
    async currentGame({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id))
            return null;
        const user = await user_1.UserModel.findOne({
            _id: req.session.user.id,
        }).exec();
        if (!user || !user.currentGame)
            return null;
        let currentGame = await chess_1.ChessModel.findOne({ _id: user.currentGame });
        if (!currentGame)
            return null;
        return currentGame;
    }
    async login(token, { req }) {
        let response = await googleVerification_1.default(token);
        let { email, username, error } = response;
        if (error || email == undefined || username == undefined) {
            return {
                errors: [
                    {
                        field: "google",
                        message: "Invalid google token",
                    },
                ],
            };
        }
        else {
            let user = await findOrCreate_1.default(email, username);
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Server Error",
                        },
                    ],
                };
            }
            req.session.user = { id: user._id };
            return { user };
        }
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    async invite(email, { req }, pubSub) {
        var _a;
        const user = await user_1.UserModel.findOne({ email }).exec();
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return {
                errors: [
                    {
                        field: "authentication",
                        message: "User is not log in",
                    },
                ],
            };
        }
        if (!user) {
            return {
                errors: [
                    {
                        field: "friend",
                        message: "User is not a member of MYCHESSAPP",
                    },
                ],
            };
        }
        else {
            if (user.gameStatus === 2) {
                return {
                    errors: [
                        {
                            field: "friend",
                            message: "User is already playing",
                        },
                    ],
                };
            }
            let newInvitation = await invite_1.default(req, user._id);
            if (newInvitation === null) {
                return {
                    errors: [
                        {
                            field: "friend",
                            message: "Internal Server Error",
                        },
                    ],
                };
            }
            const payload = newInvitation;
            await pubSub.publish("newInvitation", payload);
            return {};
        }
    }
    async invalidateQuery({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id))
            return -1;
        else {
            let user = await user_1.UserModel.findOne({
                _id: req.session.user.id,
            }).exec();
            if (!user)
                return -1;
            else {
                return user.gameStatus;
            }
        }
    }
};
__decorate([
    type_graphql_1.Query(() => user_1.UserClass, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [user_1.UserClass]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => user_1.UserClass, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", user_1.UserClass)
], UserResolver.prototype, "userByID", null);
__decorate([
    type_graphql_1.Query(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "GameStatus", null);
__decorate([
    type_graphql_1.Query(() => chess_1.ChessClass, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentGame", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("token")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "invite", null);
__decorate([
    type_graphql_1.Mutation(() => Number),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "invalidateQuery", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map