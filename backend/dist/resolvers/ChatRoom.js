"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatRoom = {
    id: (parent, args, { ChatRoomModal }, info) => {
        return parent._id;
    },
    chatRoomName: (parent, args, { ChatRoomModal }, info) => {
        return parent.chatRoomName;
    },
    users: (parent, args, { ChatRoomModal }, info) => {
        return parent.users;
    },
    messages: (parent, args, { ChatRoomModal }, info) => {
        return parent.messages;
    }
};
exports.default = ChatRoom;
