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
const Query = {
    user: (parent, { id }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ _id: id });
        return user;
    }),
    userByEmail: (parent, { email }, { UserModel }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ email: email });
        return user;
    }),
    //Bulletin
    bulletin: (parent, { location }, { BulletinModel }) => __awaiter(void 0, void 0, void 0, function* () {
        const bulletin = yield BulletinModel.findOne({ location }).populate(["messages", { path: 'messages', populate: 'likers' }]);
        //console.log(bulletin);
        return bulletin;
    }),
    // BulletinMsg
    bulletinMsg: (parent, { author }, { BulletinMsgModel }) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = yield BulletinMsgModel.find({ author: author });
        //console.log(msg);
        return msg;
    }),
};
exports.default = Query;
