<<<<<<< HEAD
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const validateUser = (UserModel, email, first_name, last_name, nick_name, picture, description) => __awaiter(void 0, void 0, void 0, function* () {
    let usr = yield UserModel.findOne({ email });
    //console.log(usr);
    if (!usr) {
        usr = yield new UserModel({ email, first_name, last_name, picture, nick_name, description }).save();
        //console.log(`user ${email} created`);
    }
    else {
        //console.log(`user ${email} found`);
    }
    //console.log(usr);
    return usr;
});
const validateBulletin = (BulletinModel, location) => __awaiter(void 0, void 0, void 0, function* () {
    let bulletin = yield BulletinModel.findOne({ location });
    //console.log(bulletin);
    if (!bulletin) {
        bulletin = yield new BulletinModel({ location }).save();
        //console.log(`bulletin ${location} created`);
    }
    else {
        //console.log(`bulletion ${location} found`);
    }
    //console.log(usr);
    return bulletin.populate([{ path: 'messages', populate: 'author' }]);
});
const Mutation = {
    createUser: (parent, { email, first_name, last_name, nick_name, picture }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield validateUser(UserModel, email, first_name, last_name, nick_name, picture, "", "");
        return usr;
    }),
    updateUser: (parent, { email, nick_name, picture, description }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield UserModel.findOne({ email });
        usr.picture = picture;
        usr.nick_name = nick_name;
        usr.description = description;
        yield usr.save();
        return usr;
    }),
    createBulletinMsg: (parent, { location, author, body, tags }, { BulletinModel, BulletinMsgModel, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        let bulletin = yield validateBulletin(BulletinModel, location);
        let newMsg = yield new BulletinMsgModel({ author, body, tags }).save();
        yield newMsg.populate(["author", "likers"]);
        //console.log(bulletin.messages[0].author.nick_name);
        bulletin.messages.push(newMsg);
        yield bulletin.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "CREATED",
                data: newMsg,
            }
        });
        return newMsg;
    }),
    updateBulletinMsg: (parent, { location, id, email, isLiked }, { UserModel, BulletinMsgModel, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield UserModel.findOne({ email });
        let msg = yield BulletinMsgModel.findOne({ _id: id });
        //console.log(bulletin.messages[0].author.nick_name);
        yield msg.populate(["author", "likers"]);
        if (isLiked) {
            msg.likers.push(usr);
        }
        else {
            //console.log(msg.likers);
            //console.log(usr);
            msg.likers = msg.likers.filter((liker) => { return liker.id !== usr.id; });
        }
        yield msg.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "UPDATED",
                data: msg,
            }
        });
        return msg;
    })
};
exports.default = Mutation;
=======
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const validateUser = (UserModel, email, first_name, last_name, nick_name, picture, description) => __awaiter(void 0, void 0, void 0, function* () {
    let usr = yield UserModel.findOne({ email });
    //console.log(usr);
    if (!usr) {
        usr = yield new UserModel({ email, first_name, last_name, picture, nick_name, description }).save();
        //console.log(`user ${email} created`);
    }
    else {
        //console.log(`user ${email} found`);
    }
    //console.log(usr);
    return usr;
});
const validateBulletin = (BulletinModel, location) => __awaiter(void 0, void 0, void 0, function* () {
    let bulletin = yield BulletinModel.findOne({ location });
    //console.log(bulletin);
    if (!bulletin) {
        bulletin = yield new BulletinModel({ location }).save();
        //console.log(`bulletin ${location} created`);
    }
    else {
        //console.log(`bulletion ${location} found`);
    }
    //console.log(usr);
    return bulletin.populate([{ path: 'messages', populate: 'author' }]);
});
const Mutation = {
    createUser: (parent, { email, first_name, last_name, nick_name, picture }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield validateUser(UserModel, email, first_name, last_name, nick_name, picture, "", "");
        return usr;
    }),
    updateUser: (parent, { email, nick_name, picture, description }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield UserModel.findOne({ email });
        usr.picture = picture;
        usr.nick_name = nick_name;
        usr.description = description;
        yield usr.save();
        return usr;
    }),
    createBulletinMsg: (parent, { location, author, body, tags }, { BulletinModel, BulletinMsgModel, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        let bulletin = yield validateBulletin(BulletinModel, location);
        let newMsg = yield new BulletinMsgModel({ author, body, tags }).save();
        yield newMsg.populate(["author", "likers"]);
        //console.log(bulletin.messages[0].author.nick_name);
        bulletin.messages.push(newMsg);
        yield bulletin.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "CREATED",
                data: newMsg,
            }
        });
        return newMsg;
    }),
    updateBulletinMsg: (parent, { location, id, email, isLiked }, { UserModel, BulletinMsgModel, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        let usr = yield UserModel.findOne({ email });
        let msg = yield BulletinMsgModel.findOne({ _id: id });
        //console.log(bulletin.messages[0].author.nick_name);
        yield msg.populate(["author", "likers"]);
        if (isLiked) {
            msg.likers.push(usr);
        }
        else {
            //console.log(msg.likers);
            //console.log(usr);
            msg.likers = msg.likers.filter((liker) => { return liker.id !== usr.id; });
        }
        yield msg.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: {
                type: "UPDATED",
                data: msg,
            }
        });
        return msg;
    }),
    createChatRoom: (parent, { chatRoomName, users }, { ChatRoomModel }) => __awaiter(void 0, void 0, void 0, function* () {
        let chatRoom = yield ChatRoomModel.findOne({ chatRoomName: chatRoomName });
        if (!chatRoom)
            chatRoom = yield new ChatRoomModel({ chatRoomName, messages: [] }).save();
        console.log('new room: ' + chatRoomName);
        return chatRoom;
    }),
    createMessage: (parent, { chatRoomName, sender, content }, { ChatRoomModel, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chatRoom = yield ChatRoomModel.findOne({ chatRoomName: chatRoomName });
        if (!chatRoom)
            throw new Error('Chat Room does not exist!');
        const oldMsgs = chatRoom.messages;
        const newMsgs = [...oldMsgs, {
                sender,
                content,
                readBy: [sender],
            }];
        const newChatRoom = yield ChatRoomModel.updateOne({ chatRoomName: chatRoomName }, { $set: { 'messages': newMsgs } });
        pubsub.publish(`chatRoom ${chatRoomName}`, {
            newMsgs,
        });
        return newMsgs;
    })
};
exports.default = Mutation;
>>>>>>> cfa65bc4be921c3c4dfc374df3d89bfa3c32ab92
