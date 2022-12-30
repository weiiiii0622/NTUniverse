import { Schema, Types, model } from 'mongoose';
//import UserModel from '../models/user';

interface IMutation {
    createUser: (x: any, y: any, z: any) => { },
    updateUser: (x: any, y: any, z: any) => { },
    // chatRoomName: String,
    // users: Types.ObjectId[],
    // messages: Types.ObjectId[],
}

const validateUser:any = async (UserModel: any, email: String, first_name: String, last_name: String, picture: String, nick_name: String, description: String) => {
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
  
const Mutation:IMutation = {
    createUser: async (parent, { email, first_name, last_name, picture }, { UserModel }) => {

        let usr = await validateUser(UserModel, email, first_name, last_name, picture, "", "");

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