"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*  BoardModel */
const BoardSchema = new mongoose_1.Schema({
    location: { type: String },
    bulletins: { types: mongoose_1.Schema.Types.ObjectId, ref: 'Bulletin' },
});
const BoardModel = (0, mongoose_1.model)('Board', BoardSchema);
/*  BulletinSchema */
const BulletinSchema = new mongoose_1.Schema({
    announcer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    text: String,
    time: String,
    tags: [String],
});
const BulletinModel = (0, mongoose_1.model)('Bulletin', BulletinSchema);
exports.default = { BoardModel, BulletinModel };
