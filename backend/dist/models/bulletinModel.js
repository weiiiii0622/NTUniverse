"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  BulletinSchema  */
const BulletinSchema = new mongoose_1.Schema({
    location: { type: String },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'BulletinMsg' }],
});
const BulletinModel = (0, mongoose_1.model)('Bulletin', BulletinSchema);
exports.default = BulletinModel;
