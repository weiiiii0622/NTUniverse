const BulletinMsg = {
    author(parent: any, args: any, { UserModel }: any, info: any) {
        return UserModel.findOne({_id: parent.author});
    },
};
  
export { BulletinMsg as default };