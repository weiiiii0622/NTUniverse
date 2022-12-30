import { Schema, Types, model } from 'mongoose';

interface IChatRoom {
  chatRoomName: String,
  users: Types.ObjectId[],
  messages: Types.ObjectId[],
}

interface IMessage {
  chatRoomName: String,
  sender: Types.ObjectId,
  time: String,
}

/*  ChatRoomModel */
const ChatRoomSchema = new Schema<IChatRoom>({
  chatRoomName: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

const ChatRoomModel = model<IChatRoom>('ChatRoom', ChatRoomSchema);

/*  MessageModel */
const MessageSchema = new Schema<IMessage>({
  chatRoomName: String,
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  time: String,
});

const MessageModel = model<IMessage>('Message', MessageSchema);

export default { ChatRoomModel, MessageModel };
