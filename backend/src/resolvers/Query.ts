const Query = {
  user: async (parent: any, { id }: any, { UserModel }: any) => {
    const user = await UserModel.findOne({ _id: id });
    return user;
  },
  userByEmail:async (parent: any, { email }: any, { UserModel }: any) => {
    const user = await UserModel.findOne({ email: email });
    return user;
  },

  //Bulletin
  bulletin: async (parent: any, { location }: any, { BulletinModel }: any) => {
    const bulletin = await BulletinModel.findOne({ location }).populate(["messages", {path: 'messages', populate: 'likers' }]);
    //console.log(bulletin);
    return bulletin;
  },

  // BulletinMsg
  bulletinMsg: async (parent: any, { author }: any, { BulletinMsgModel }: any) => {
    const msg = await BulletinMsgModel.find({ author: author });
    //console.log(msg);
    return msg;
  },
};

export default Query;
