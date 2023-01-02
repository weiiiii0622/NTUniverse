"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  BulletinMsgSchema  */
const BulletinMsgSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    time: String,
    tags: [String],
});
const BulletinMsgModel = (0, mongoose_1.model)('BulletinMsg', BulletinMsgSchema);
exports.default = BulletinMsgModel;
