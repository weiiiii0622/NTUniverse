"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Message_1 = require("./Message");
let ChatRoom = class ChatRoom {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)()
], ChatRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ChatRoom.prototype, "chatRoomName", void 0);
__decorate([
    (0, typeorm_1.Column)(type => User_1.User)
], ChatRoom.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)(type => Message_1.Message)
], ChatRoom.prototype, "messages", void 0);
ChatRoom = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], ChatRoom);
exports.ChatRoom = ChatRoom;
;
