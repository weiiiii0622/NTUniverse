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
  }}],
});

const ChatRoomModel = model<IChatRoom>('ChatRoom', ChatRoomSchema);

export default ChatRoomModel;
