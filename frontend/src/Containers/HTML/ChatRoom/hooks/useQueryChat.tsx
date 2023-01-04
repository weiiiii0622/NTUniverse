import { useQuery } from '@apollo/client';
import React from 'react';
import { CHATROOM_QUERY, NEWMESSAGE_SUBSCRIPTION } from '../../../../Utils/graphql';
import { useEffect, useState } from "react"
import _ from 'lodash';
import { useChatRoomContext } from '../../../../Utils/ChatRoom/useChatRoomContext';


interface useQueryChatProps {
  chatRoomName: String,
}


const useQueryChat = (props: useQueryChatProps) => {
  const { chatRoomName } = props;
  const { chatRooms, setChatRooms } = useChatRoomContext();


  // console.log('useQueryChat');


  const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, {
    variables: {
      chatRoomName: chatRoomName,
    },
    fetchPolicy: "cache-and-network",
  })

  // console.log('data');

  useEffect(() => {
    let unsub;
    try {
      // console.log(`chatroom sub! ${chatRoomName}`);
      unsub = subscribeToMore({
        document: NEWMESSAGE_SUBSCRIPTION,
        variables: { chatRoomName: chatRoomName },
        updateQuery: (prev, { subscriptionData }) => {

          // console.log("subData:")
          // console.log(subscriptionData);
          // console.log('prev:');

          // console.log(prev);

          if (!subscriptionData) return prev;
          var newMessage = subscriptionData.data.newMessage;

          let temp = _.cloneDeep(prev);
          temp.chatRoom.messages = newMessage;


          let tempRooms = _.cloneDeep(chatRooms);
          tempRooms.find(e => e.name === chatRoomName).lastMsg = newMessage[newMessage.length - 1];
          setChatRooms(tempRooms);

          // console.log('data');
          // console.log(temp);

          // console.log('last');
          // console.log(tempRooms);
          

          return temp;
        },
      });
    } catch (e) {
      // console.log(e);
    }
    return () => unsub();
  }, [subscribeToMore, chatRoomName]);


  return { loading, error, data };
}

export default useQueryChat;