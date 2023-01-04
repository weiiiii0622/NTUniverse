import { useQuery } from '@apollo/client';
import React from 'react';
import { CHATROOM_QUERY, NEWMESSAGE_SUBSCRIPTION } from '../../../../Utils/graphql';
import { useEffect, useState } from "react"
import _ from 'lodash';


interface useQueryChatProps {
  chatRoomName: String,
}


const useQueryChat = (props: useQueryChatProps) => {
  const { chatRoomName } = props;

  console.log('useQueryChat');
  

  const { data, loading, subscribeToMore } = useQuery(CHATROOM_QUERY, {
    variables: {
      chatRoomName: chatRoomName,
    },
    fetchPolicy: "cache-and-network",
  })

  useEffect(() => {
    let unsub;
    try {
      console.log(`chatroom sub! ${chatRoomName}`);
      unsub = subscribeToMore({
        document: NEWMESSAGE_SUBSCRIPTION,
        variables: { chatRoomName: chatRoomName },
        updateQuery: (prev, { subscriptionData }) => {

          console.log("subData:")
          console.log(subscriptionData);
          return prev;
          
          // if (!subscriptionData) return prev;
          // var newMessage = subscriptionData.data.bulletin.data;
          // const type = subscriptionData.data.bulletin.type;
          // //console.log("prev:");
          // //console.log(prev);
          // let temp = _.cloneDeep(prev);
          // //console.log(temp);
          // if (temp.bulletin === undefined) {
          //   temp = {
          //     bulletin: {
          //       messages: []
          //     }
          //   }
          // }
          // if (type === "CREATED") {
          //   return {
          //     bulletin: {
          //       __typename: "Bulletin",
          //       location: location,
          //       messages: [...temp.bulletin.messages, newMessage],
          //     }
          //   };
          // }
          // else if (type === "UPDATED") {
          //   let newMsgs = temp.bulletin.messages;
          //   let idx = newMsgs.findIndex((msg) => { return msg.id === newMessage.id });
          //   //console.log(idx);
          //   newMsgs[idx] = newMessage;
          //   return {
          //     bulletin: {
          //       __typename: "Bulletin",
          //       location: location,
          //       messages: [...newMsgs],
          //     }
          //   };
          // }
        },
      });
    } catch (e) {
      console.log(e);
    }
    return () => unsub();
  }, [subscribeToMore, chatRoomName]);

  // const { nick_name, friend, box } = props;

  // const { loading, error, data, subscribeToMore } = useQuery(
  //   CHATBOX_QUERY, {
  //   variables: {
  //     name: box,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  // useEffect(() => {
  //   const { data, loading, subscribeToMore } = useQuery(CHATROOM_QUERY, {
  //     variables: {
  //       chatRoomName: location,
  //     },
  //     fetchPolicy: "cache-and-network",
  //   })

  //   useEffect(() => {
  //     let unsub;
  //     try {
  //       console.log(`sub! ${location}`);
  //       unsub = subscribeToMore({
  //         document: BULLETIN_SUBSCRIPTION,
  //         variables: { location: location },
  //         updateQuery: (prev, { subscriptionData }) => {

  //           //console.log("subData:")
  //           //console.log(subscriptionData);
  //           if (!subscriptionData) return prev;
  //           var newMessage = subscriptionData.data.bulletin.data;
  //           const type = subscriptionData.data.bulletin.type;
  //           //console.log("prev:");
  //           //console.log(prev);
  //           let temp = _.cloneDeep(prev);
  //           //console.log(temp);
  //           if (temp.bulletin === undefined) {
  //             temp = {
  //               bulletin: {
  //                 messages: []
  //               }
  //             }
  //           }
  //           if (type === "CREATED") {
  //             return {
  //               bulletin: {
  //                 __typename: "Bulletin",
  //                 location: location,
  //                 messages: [...temp.bulletin.messages, newMessage],
  //               }
  //             };
  //           }
  //           else if (type === "UPDATED") {
  //             let newMsgs = temp.bulletin.messages;
  //             let idx = newMsgs.findIndex((msg) => { return msg.id === newMessage.id });
  //             //console.log(idx);
  //             newMsgs[idx] = newMessage;
  //             return {
  //               bulletin: {
  //                 __typename: "Bulletin",
  //                 location: location,
  //                 messages: [...newMsgs],
  //               }
  //             };
  //           }
  //         },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return () => unsub();
  //   }, [subscribeToMore, location]);
}

export default useQueryChat;