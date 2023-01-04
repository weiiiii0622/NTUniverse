"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  ChatRoomModel */
const ChatRoomSchema = new mongoose_1.Schema({
    chatRoomName: String,
    messages: [{ type: {
                sender: String,
                senderNick: String,
                content: String,
            } }],
});
const ChatRoomModel = (0, mongoose_1.model)('ChatRoom', ChatRoomSchema);
exports.default = ChatRoomModel;
