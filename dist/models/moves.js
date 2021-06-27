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
var PositionClass_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const type_graphql_1 = require("type-graphql");
let PositionClass = PositionClass_1 = class PositionClass extends defaultClasses_1.TimeStamps {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], PositionClass.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], PositionClass.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], PositionClass.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop({ ref: () => PositionClass_1 }),
    __metadata("design:type", Object)
], PositionClass.prototype, "next", void 0);
PositionClass = PositionClass_1 = __decorate([
    type_graphql_1.ObjectType()
], PositionClass);
exports.PositionModel = typegoose_1.getModelForClass(PositionClass);
//# sourceMappingURL=moves.js.map