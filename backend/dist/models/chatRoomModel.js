<<<<<<< HEAD
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
=======
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
>>>>>>> cec93bcb74a64a808f731942af3e865f6eb19316
