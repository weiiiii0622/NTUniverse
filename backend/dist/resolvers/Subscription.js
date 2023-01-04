"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const Subscription = {
    bulletin: {
        subscribe: (parent, { location }, { pubsub }) => {
            console.log(`bulletin ${location} subscribed`);
            return pubsub.subscribe(`bulletin ${location}`);
        }
    },
    newMessage: {
        subscribe: (parent, { chatRoomName }, { pubsub }) => {
            console.log(`chatRoom ${chatRoomName} subscribed`);
            return pubsub.subscribe(`chatRoom ${chatRoomName}`);
        },
    }
};
exports.default = Subscription;
