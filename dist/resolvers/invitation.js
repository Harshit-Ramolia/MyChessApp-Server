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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationResolver = void 0;
const invitations_1 = require("../models/invitations");
const type_graphql_1 = require("type-graphql");
const user_1 = require("../models/user");
const chess_1 = require("../models/chess");
let InvitationResolver = class InvitationResolver {
    async invitationsOfUser({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return null;
        }
        else {
            return await invitations_1.InvitationModel.find({ friend: req.session.user.id }).exec();
        }
    }
    async cancelInvitation({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return false;
        }
        else {
            try {
                await invitations_1.InvitationModel.deleteMany({ host: req.session.user.id });
                await user_1.UserModel.findOneAndUpdate({ _id: req.session.user.id }, { gameStatus: 0 });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
    async acceptInvitation(hostID, { req }, pubSub) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return false;
        }
        else {
            try {
                let invitaitation = await invitations_1.InvitationModel.findOne({
                    host: hostID,
                    friend: req.session.user.id,
                });
                if (!invitaitation) {
                    return false;
                }
                let newChess = await chess_1.ChessModel.create({
                    white: hostID,
                    black: req.session.user.id,
                    isGameRunning: true,
                });
                await user_1.UserModel.findOneAndUpdate({ _id: req.session.user.id }, { gameStatus: 2, currentGame: newChess._id });
                await user_1.UserModel.findOneAndUpdate({ _id: hostID }, { gameStatus: 2, currentGame: newChess._id });
                await invitations_1.InvitationModel.deleteMany({
                    friend: req.session.user.id,
                });
                await invitations_1.InvitationModel.deleteMany({
                    host: hostID,
                });
                const payload = { id: hostID };
                await pubSub.publish("gameStarted", payload);
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
    gameStarted(id) {
        id;
        return true;
    }
    newInvitation(Invitation, id) {
        id;
        return Invitation;
    }
    async host(invitationInstance) {
        return await user_1.UserModel.findOne({
            _id: invitationInstance._doc.host,
        }).exec();
    }
    async friend(invitationInstance) {
        return await user_1.UserModel.findOne({
            _id: invitationInstance._doc.friend,
        }).exec();
    }
};
__decorate([
    type_graphql_1.Query(() => [invitations_1.InvitationClass], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvitationResolver.prototype, "invitationsOfUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvitationResolver.prototype, "cancelInvitation", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("hostID")),
    __param(1, type_graphql_1.Ctx()),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], InvitationResolver.prototype, "acceptInvitation", null);
__decorate([
    type_graphql_1.Subscription({
        topics: ["gameStarted", "endGame"],
        filter: ({ payload, args }) => {
            return payload.id.toString() == args.id;
        },
        nullable: true,
    }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], InvitationResolver.prototype, "gameStarted", null);
__decorate([
    type_graphql_1.Subscription({
        topics: "newInvitation",
        filter: ({ payload, args }) => {
            return payload.friend.toString() == args.id;
        },
        nullable: true,
    }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitations_1.InvitationClass, String]),
    __metadata("design:returntype", invitations_1.InvitationClass)
], InvitationResolver.prototype, "newInvitation", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitations_1.InvitationClass]),
    __metadata("design:returntype", Promise)
], InvitationResolver.prototype, "host", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitations_1.InvitationClass]),
    __metadata("design:returntype", Promise)
], InvitationResolver.prototype, "friend", null);
InvitationResolver = __decorate([
    type_graphql_1.Resolver(invitations_1.InvitationClass)
], InvitationResolver);
exports.InvitationResolver = InvitationResolver;
//# sourceMappingURL=invitation.js.map