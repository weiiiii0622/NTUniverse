const Subscription = {
    bulletin: {
      subscribe: (parent: any, { location }: any, { pubsub }: any) => {
        //console.log(`bulletin ${location} subscribed`);
        return pubsub.subscribe(`bulletin ${location}`);
      }
    }
}
  
export { Subscription as default };