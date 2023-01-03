"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  ChatRoomModel */
const ChatRoomSchema = new mongoose_1.Schema({
    chatRoomName: String,
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }],
});
const ChatRoomModel = (0, mongoose_1.model)('ChatRoom', ChatRoomSchema);
/*  MessageModel */
const MessageSchema = new mongoose_1.Schema({
    chatRoomName: String,
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    time: String,
});
const MessageModel = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = { ChatRoomModel, MessageModel };
