import { Schema, Types, model } from 'mongoose';
import _ from 'lodash';


interface IMutation {
    createUser: (x: any, y: any, z: any) => { },
    updateUser: (x: any, y: any, z: any) => { },
    createBulletinMsg: (x: any, y: any, z: any) => { },
    updateBulletinMsg: (x: any, y: any, z: any) => { },
    // chatRoomName: String,
    // users: Types.ObjectId[],
    // messages: Types.ObjectId[],
}

const validateUser:any = async (UserModel: any, email: String, first_name: String, last_name: String, nick_name: String, picture: String, description: String) => {
    let usr = await UserModel.findOne({ email });
    //console.log(usr);
    if(!usr){
        usr = await new UserModel({ email, first_name, last_name, picture, nick_name, description }).save();
        //console.log(`user ${email} created`);
    }
    else{
        //console.log(`user ${email} found`);
    }
    //console.log(usr);
    return usr;
}

const validateBulletin:any = async (BulletinModel: any, location: string) => {
    let bulletin = await BulletinModel.findOne({ location });
    //console.log(bulletin);
    if(!bulletin){
        bulletin = await new BulletinModel({ location }).save();
        //console.log(`bulletin ${location} created`);
    }
    else{
        //console.log(`bulletion ${location} found`);
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

    createBulletinMsg: async (parent, { location ,author, body, tags }, { BulletinModel, BulletinMsgModel, pubsub }) => {

        let bulletin = await validateBulletin(BulletinModel, location);
        let newMsg = await new BulletinMsgModel({ author, body, tags }).save();
        await newMsg.populate(["author", "likers"]);

        //console.log(bulletin.messages[0].author.nick_name);
        bulletin.messages.push(newMsg);
        await bulletin.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "CREATED",
                data: newMsg,
            }
        });

        return newMsg;
    },

    updateBulletinMsg: async (parent, { location, id, email, isLiked }, {  UserModel, BulletinMsgModel, pubsub }) => {

        let usr = await UserModel.findOne({ email });
        let msg = await BulletinMsgModel.findOne({ _id: id });

        //console.log(bulletin.messages[0].author.nick_name);
        await msg.populate(["author", "likers"]);
        if(isLiked){
            msg.likers.push(usr);
        }
        else{
            //console.log(msg.likers);
            //console.log(usr);
            msg.likers = msg.likers.filter((liker: any) => {return liker.id!==usr.id});
        }
        await msg.save();
        
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "UPDATED",
                data: msg,
            }
        });

        return msg;
    }
};

export { Mutation as default };