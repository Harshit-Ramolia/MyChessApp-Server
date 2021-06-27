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
exports.ChessResolver = void 0;
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const chess_1 = require("../models/chess");
const FieldErrorType_1 = require("./FieldErrorType");
const user_1 = require("../models/user");
const position_1 = require("../models/position");
let ChessResponse = class ChessResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldErrorType_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ChessResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => chess_1.ChessClass, { nullable: true }),
    __metadata("design:type", chess_1.ChessClass)
], ChessResponse.prototype, "chess", void 0);
ChessResponse = __decorate([
    type_graphql_1.ObjectType()
], ChessResponse);
let ChessResolver = class ChessResolver {
    async createNewChess({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return {
                errors: [
                    {
                        field: "authentication",
                        message: "user must be log in to start the game",
                    },
                ],
            };
        }
        let newChess = await chess_1.ChessModel.create({
            white: req.session.user.id,
            black: req.session.user.id,
        });
        return { chess: newChess };
    }
    async allChess() {
        return await chess_1.ChessModel.find({}).exec();
    }
    async historyGames({ req }) {
        var _a;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id))
            return null;
        return await chess_1.ChessModel.find({
            $or: [{ white: req.session.user.id }, { black: req.session.user.id }],
        }).exec();
    }
    async saveMove(chessID, position, move, { req }, pubSub) {
        var _a, _b, _c, _d, _e;
        if (!((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id))
            return false;
        const chess = await chess_1.ChessModel.findOneAndUpdate({ _id: chessID }, { lastPosition: position }).exec();
        if (!chess)
            return false;
        let payload = { position, id: "", move };
        if (((_b = chess.white) === null || _b === void 0 ? void 0 : _b.toString()) === req.session.user.id)
            payload = Object.assign(Object.assign({}, payload), { id: ((_c = chess.black) === null || _c === void 0 ? void 0 : _c.toString()) || "" });
        else if (((_d = chess.black) === null || _d === void 0 ? void 0 : _d.toString()) === req.session.user.id)
            payload = Object.assign(Object.assign({}, payload), { id: ((_e = chess.white) === null || _e === void 0 ? void 0 : _e.toString()) || "" });
        else {
            return false;
        }
        await position_1.PositionModel.create({ chessID, data: position });
        await pubSub.publish("move", payload);
        return true;
    }
    async endGame(chessID, pubSub) {
        var _a, _b;
        try {
            let chess = await chess_1.ChessModel.findOneAndUpdate({ _id: chessID }, { isGameRunning: false }).exec();
            if (!chess)
                return false;
            await user_1.UserModel.findOneAndUpdate({ _id: chess.white }, { gameStatus: 0, currentGame: null });
            await user_1.UserModel.findOneAndUpdate({ _id: chess.black }, { gameStatus: 0, currentGame: null });
            await pubSub.publish("gameStarted", {
                id: (_a = chess.white) === null || _a === void 0 ? void 0 : _a.toString(),
            });
            await pubSub.publish("gameStarted", {
                id: (_b = chess.black) === null || _b === void 0 ? void 0 : _b.toString(),
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    move(movePayload, id) {
        id;
        return movePayload.move;
    }
    async white(chessInstance) {
        return await user_1.UserModel.findOne({ _id: chessInstance._doc.white }).exec();
    }
    async black(chessInstance) {
        return await user_1.UserModel.findOne({ _id: chessInstance._doc.black }).exec();
    }
    async listOfPositions(chessInstance) {
        let positions = await position_1.PositionModel.find({
            chessID: chessInstance._doc._id,
        }).exec();
        return positions.map((obj) => obj.data);
    }
};
__decorate([
    type_graphql_1.Query(() => ChessResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "createNewChess", null);
__decorate([
    type_graphql_1.Query(() => [chess_1.ChessClass]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "allChess", null);
__decorate([
    type_graphql_1.Query(() => [chess_1.ChessClass], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "historyGames", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("chessID")),
    __param(1, type_graphql_1.Arg("position")),
    __param(2, type_graphql_1.Arg("move")),
    __param(3, type_graphql_1.Ctx()),
    __param(4, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "saveMove", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("chessID")),
    __param(1, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "endGame", null);
__decorate([
    type_graphql_1.Subscription({
        topics: "move",
        filter: ({ payload, args }) => {
            return payload.id.toString() == args.id;
        },
        nullable: true,
    }),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], ChessResolver.prototype, "move", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chess_1.ChessClass]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "white", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chess_1.ChessClass]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "black", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chess_1.ChessClass]),
    __metadata("design:returntype", Promise)
], ChessResolver.prototype, "listOfPositions", null);
ChessResolver = __decorate([
    type_graphql_1.Resolver(chess_1.ChessClass)
], ChessResolver);
exports.ChessResolver = ChessResolver;
//# sourceMappingURL=chess.js.map