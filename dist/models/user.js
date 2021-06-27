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
exports.UserModel = exports.UserClass = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const type_graphql_1 = require("type-graphql");
let UserClass = class UserClass extends defaultClasses_1.TimeStamps {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserClass.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], UserClass.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], UserClass.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserClass.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop({ match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ }),
    __metadata("design:type", String)
], UserClass.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ defaultValue: 0 }),
    __metadata("design:type", Number)
], UserClass.prototype, "gameStatus", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserClass.prototype, "currentGame", void 0);
UserClass = __decorate([
    type_graphql_1.ObjectType()
], UserClass);
exports.UserClass = UserClass;
exports.UserModel = typegoose_1.getModelForClass(UserClass);
//# sourceMappingURL=user.js.map