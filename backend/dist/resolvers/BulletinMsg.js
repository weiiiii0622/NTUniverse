"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const BulletinMsg = {
    author(parent, args, { UserModel }, info) {
        return UserModel.findOne({ _id: parent.author });
    },
};
exports.default = BulletinMsg;
