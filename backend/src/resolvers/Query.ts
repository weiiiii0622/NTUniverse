const Query = {
  user: async (parent: any, { id }: any, { UserModel }: any) => {
    const user = await UserModel.findOne({ _id: id });
    return user;
  },
  userByEmail: async (parent: any, { email }: any, { UserModel }: any) => {
    const user = await UserModel.findOne({ email: email });
    return user;
  },
  userAll: async (parent: any, { }: any, { UserModel }: any) => {
    const user = await UserModel.find();
    return user;
  },

  //Bulletin
  bulletin: async (parent: any, { location }: any, { BulletinModel }: any) => {
    const bulletin = await BulletinModel.findOne({ location }).populate(["messages", { path: 'messages', populate: 'likers' }]);
    //console.log(bulletin);
    return bulletin;
  },

  // BulletinMsg
  bulletinMsg: async (parent: any, { author }: any, { BulletinMsgModel }: any) => {
    const msg = await BulletinMsgModel.find({ author: author });
    //console.log(msg);
    return msg;
  },

  // ChatRoom
  chatRoom: async (parent: any, args: any, { ChatRoomModel }: any) => {
    const { chatRoomName } = args;
    let data;
    let chatRoom = await ChatRoomModel.findOne({ chatRoomName: chatRoomName });
    if (!chatRoom) {
      if (chatRoomName === 'World Channel') {
        data = {
          chatRoomName: 'World Channel',
          messages: {
            sender: 'NTUniverse',
            content: 'Welcome to NTUniverse',
            // readBy: ['NTUniverse'],
          }
        };
        chatRoom = await new ChatRoomModel(data).save();
      } else {
        throw new Error('Chat Room does not exist');  
      }
    }
    
    return chatRoom;
  }
};

export default Query;
