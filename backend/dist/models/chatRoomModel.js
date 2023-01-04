"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// interface IMessage {
//   chatRoomName: String,
//   sender: Types.ObjectId,
//   content: String,
//   readBy: Types.ObjectId[],
// }
/*  ChatRoomModel */
const ChatRoomSchema = new mongoose_1.Schema({
    chatRoomName: String,
    users: [String],
    messages: [{ type: {
                sender: String,
                content: String,
            } }],
});
const ChatRoomModel = (0, mongoose_1.model)('ChatRoom', ChatRoomSchema);
exports.default = ChatRoomModel;
