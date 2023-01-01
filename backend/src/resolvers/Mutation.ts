import { Schema, Types, model } from 'mongoose';
//import UserModel from '../models/user';

interface IMutation {
    createUser: (x: any, y: any, z: any) => { },
    updateUser: (x: any, y: any, z: any) => { },
    createBulletinMsg: (x: any, y: any, z: any) => { },
    // chatRoomName: String,
    // users: Types.ObjectId[],
    // messages: Types.ObjectId[],
}

const validateUser:any = async (UserModel: any, email: String, first_name: String, last_name: String, nick_name: String, picture: String, description: String) => {
    let usr = await UserModel.findOne({ email });
    console.log(usr);
    if(!usr){
        usr = await new UserModel({ email, first_name, last_name, picture, nick_name, description }).save();
        console.log(`user ${email} created`);
    }
    else{
        console.log(`user ${email} found`);
    }
    //console.log(usr);
    return usr;
}

const validateBulletin:any = async (BulletinModel: any, location: string) => {
    let bulletin = await BulletinModel.findOne({ location });
    //console.log(bulletin);
    if(!bulletin){
        bulletin = await new BulletinModel({ location }).save();
        console.log(`bulletin ${location} created`);
    }
    else{
        console.log(`bulletion ${location} found`);
    }
    //console.log(usr);
    return bulletin.populate([{path: 'messages', populate: 'author' }]);
}
  
const Mutation:IMutation = {
    createUser: async (parent, { email, first_name, last_name, nick_name, picture }, { UserModel }) => {

        let usr = await validateUser(UserModel, email, first_name, last_name, nick_name, picture, "", "");

        return usr;
    },

    updateUser: async (parent, { email, nick_name, picture, description }, { UserModel }) => {

        let usr = await UserModel.findOne({ email });

        usr.picture = picture;
        usr.nick_name = nick_name;
        usr.description = description;

        await usr.save();
        return usr;
    },

    createBulletinMsg: async (parent, { location ,author, body, time, tags }, { BulletinModel, BulletinMsgModel, pubsub }) => {

        let bulletin = await validateBulletin(BulletinModel, location);
        let newMsg = await new BulletinMsgModel({ author, body, time, tags }).save();

        //console.log(bulletin.messages[0].author.nick_name);
        bulletin.messages.push(newMsg);

        await bulletin.save();

        // pubsub.publish(`Bulletin ${location}`, {
        //     message: newMsg,
        // });

        return newMsg;
    }

    // createMessage: async(parent, { name, to, body }, { ChatBoxModel, pubsub }) => {
    //     const chatName = makeName(name, to);
    //     const chatBox = await validateBox(ChatBoxModel, chatName);
    //     const newMsg = { sender: name, body: body };
    //     chatBox.messages.push(newMsg);
    //     await chatBox.save();
    //     //console.log(`msg ${body} published`);
    //     pubsub.publish(`chatBox ${chatName}`, {
    //     message: newMsg,
    //     });
    //     return newMsg;
    // },
};

export { Mutation as default };