"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  BulletinSchema  */
const BulletinSchema = new mongoose_1.Schema({
    location: { type: String },
    messages: [{ types: mongoose_1.Schema.Types.ObjectId, ref: 'BulletinMsg' }],
});
const BulletinModel = (0, mongoose_1.model)('Bulletin', BulletinSchema);
/*  BulletinMsgSchema  */
const BulletinMsgSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    time: String,
    tags: [String],
});
const BulletinMsgModel = (0, mongoose_1.model)('BulletinMsg', BulletinMsgSchema);
exports.default = { BulletinModel, BulletinMsgModel };
