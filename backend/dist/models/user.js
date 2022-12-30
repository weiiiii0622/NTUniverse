<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    //id: String,
    email: String,
    first_name: String,
    last_name: String,
    picture: String,
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    //id: String,
    email: String,
    first_name: String,
    last_name: String,
    nick_name: String,
    picture: String,
    description: String,
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
>>>>>>> 0eeeab2df40265519f83d33d19f863e3180ec7ef
