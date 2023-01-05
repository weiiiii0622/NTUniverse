import { Schema, Types, model } from 'mongoose';

interface IChatRoom {
  chatRoomName: String,
  messages: Object[],
}

/*  ChatRoomModel */
const ChatRoomSchema = new Schema<IChatRoom>({
  chatRoomName: String,
  messages: [{ type: { 
    sender: String,
    senderNick: String,
    content: String,
  }}],
});

const ChatRoomModel = model<IChatRoom>('ChatRoom', ChatRoomSchema);

export default ChatRoomModel;
