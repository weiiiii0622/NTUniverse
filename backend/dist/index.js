"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const mongo_1 = __importDefault(require("./mongo"));
//(async () => console.log('hello world!'))();
(0, mongo_1.default)();
const PORT = process.env.PORT || 4001;
server_1.default.listen(PORT, () => { console.log(`listening on PORT ${PORT}`); });
