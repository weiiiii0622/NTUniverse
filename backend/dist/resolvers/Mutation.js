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
        yield newMsg.populate(["author"]);
        //console.log(bulletin.messages[0].author.nick_name);
        bulletin.messages.push(newMsg);
        yield bulletin.save();
        //let msg = _.cloneDeep(newMsg.populate(['author']));
        //console.log(newMsg);
        pubsub.publish(`bulletin ${location}`, {
            bulletin: newMsg,
        });
        return newMsg;
    })
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
exports.default = Mutation;
