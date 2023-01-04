import { Schema, Types, model } from 'mongoose';

interface IChatRoom {
  chatRoomName: String,
  users: String[],
  messages: Object[],
}

// interface IMessage {
//   chatRoomName: String,
//   sender: Types.ObjectId,
//   content: String,
//   readBy: Types.ObjectId[],
// }

/*  ChatRoomModel */
const ChatRoomSchema = new Schema<IChatRoom>({
  chatRoomName: String,
  users: [String]!,
  messages: [{ type: { 
    sender: String,
    content: String,
    readBy: [String],
  }}],
});

const ChatRoomModel = model<IChatRoom>('ChatRoom', ChatRoomSchema);

// /*  MessageModel */
// const MessageSchema = new Schema<IMessage>({
//   chatRoomName: String,
//   sender: { type: Schema.Types.ObjectId, ref: 'User' },
//   content: String,
//   readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// });

// const MessageModel = model<IMessage>('Message', MessageSchema);

export default ChatRoomModel;
