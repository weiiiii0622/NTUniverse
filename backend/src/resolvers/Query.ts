const Query = {
  user: async (parent, { name }, { UserModel }) => {
    const user = await UserModel.findOne({ name: name });
    return user;
  },
  userByEmail:async (parent, { email }, { UserModel }) => {
    const user = await UserModel.findOne({ email: email });
    return user;
  }
};

export default Query;
