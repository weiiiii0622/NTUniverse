const Subscription = {
    bulletin: {
      subscribe: (parent: any, { location }: any, { pubsub }: any) => {
        console.log(`bulletin ${location} subscribed`);
        return pubsub.subscribe(`bulletin ${location}`);
      }
    },

    newMessage: {
      subscribe: (parent: any, { chatRoomName }: any, { pubsub }: any) => {
        console.log(`chatRoom ${chatRoomName} subscribed`);
        return pubsub.subscribe(`chatRoom ${chatRoomName}`);
      },
    }
}
  
export { Subscription as default };