const ChatRoom = {
    id: (parent: any, args: any, { ChatRoomModal }: any, info: any) => {
        return parent._id;
    },
    
    chatRoomName: (parent: any, args: any, { ChatRoomModal }: any, info: any) => {
        return parent.chatRoomName;
    },

    messages: (parent: any, args: any, { ChatRoomModal }: any, info: any) => {
        return parent.messages;
    }
}

export default ChatRoom;