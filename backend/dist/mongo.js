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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv-defaults/config");
const user_1 = __importDefault(require("./models/user"));
/* handle connection to mongodb */
function mongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        require('dotenv-defaults').config();
        if (!process.env.MONGO_URL) {
            console.error('Missing MONGO_URL!!!');
            process.exit(1);
        }
        yield mongoose_1.default.connect(`${process.env.MONGO_URL}`)
            .then((res) => console.log("mongo db connection created"));
        const testData = new user_1.default({
            id: '1234',
            name: 'test',
            email: 'ntuniverse@gmail.com',
            picture: 'pi4c',
        });
        yield testData.save();
        console.log('add one');
    });
}
exports.default = mongoConnect;
