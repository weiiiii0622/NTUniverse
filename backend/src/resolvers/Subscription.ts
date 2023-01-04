const Subscription = {
    bulletin: {
      subscribe: (parent: any, { location }: any, { pubsub }: any) => {
        console.log(`bulletin ${location} subscribed`);
        return pubsub.subscribe(`bulletin ${location}`);
      }
    },

    chatRoom: {
      subscribe: (parent: any, { chatRoomName }: any, { pubsub }: any) => {
        console.log(`bulletin ${location} subscribed`);
        return pubsub.subscribe(`chatRoom ${chatRoomName}`);
      },
    }
}
  
export { Subscription as default };