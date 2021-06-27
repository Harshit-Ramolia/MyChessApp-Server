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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessModel = exports.ChessClass = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const type_graphql_1 = require("type-graphql");
const position_1 = require("./position");
const user_1 = require("./user");
let ChessClass = class ChessClass extends defaultClasses_1.TimeStamps {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ChessClass.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ChessClass.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ChessClass.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => user_1.UserClass),
    typegoose_1.prop({ ref: () => user_1.UserClass }),
    __metadata("design:type", Object)
], ChessClass.prototype, "white", void 0);
__decorate([
    type_graphql_1.Field(() => user_1.UserClass),
    typegoose_1.prop({ ref: () => user_1.UserClass }),
    __metadata("design:type", Object)
], ChessClass.prototype, "black", void 0);
__decorate([
    type_graphql_1.Field(() => position_1.PositionClass, { nullable: true }),
    typegoose_1.prop({ ref: () => position_1.PositionClass }),
    __metadata("design:type", Object)
], ChessClass.prototype, "firstPosition", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ default: true }),
    __metadata("design:type", Boolean)
], ChessClass.prototype, "isGameRunning", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ChessClass.prototype, "listOfPositions", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], ChessClass.prototype, "lastPosition", void 0);
ChessClass = __decorate([
    type_graphql_1.ObjectType()
], ChessClass);
exports.ChessClass = ChessClass;
exports.ChessModel = typegoose_1.getModelForClass(ChessClass);
//# sourceMappingURL=chess.js.map