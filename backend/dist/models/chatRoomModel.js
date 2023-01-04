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
                readBy: [String],
            } }],
});
const ChatRoomModel = (0, mongoose_1.model)('ChatRoom', ChatRoomSchema);
// /*  MessageModel */
// const MessageSchema = new Schema<IMessage>({
//   chatRoomName: String,
//   sender: { type: Schema.Types.ObjectId, ref: 'User' },
//   content: String,
//   readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// });
// const MessageModel = model<IMessage>('Message', MessageSchema);
exports.default = ChatRoomModel;
