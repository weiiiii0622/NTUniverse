import { useQuery } from '@apollo/client';
import React from 'react';
import { CHATROOM_QUERY, NEWMESSAGE_SUBSCRIPTION } from '../../../../Utils/graphql';
import { useEffect, useState } from "react"
import _ from 'lodash';
import { useChatRoomContext } from '../../../../Utils/ChatRoom/useChatRoomContext';
import { useMyContext } from '../../../../Utils/useMyContext';
import { message, notification } from 'antd';
import { config } from 'process';
import { NotificationOutlined } from '@ant-design/icons';


interface useQueryChatProps {
  chatRoomName: String,
}



const useQueryChat = (props: useQueryChatProps) => {
  const { chatRoomName } = props;
  const { me, isLogin } = useMyContext();
  const { chatRooms, setChatRooms } = useChatRoomContext();
  
  
  // console.log('useQueryChat');
  
  
  const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, {
    variables: {
      chatRoomName: chatRoomName,
    },
    fetchPolicy: "cache-and-network",
  })
  
  // console.log('data');
  // const [noteApi, contextHolder] = notification.useNotification();
  
  // const openNotification = () => {
  //   console.log('note');
    
  //   noteApi.open({
  //     message: 'Notification Title',
  //     description:
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //     icon: <NotificationOutlined style={{ color: '#108ee9' }} />,
  //     placement: 'bottomLeft'
  //   });
  // };
  
  useEffect(() => {
    let unsub;
    try {
      // console.log(`chatroom sub! ${chatRoomName}`);
      unsub = subscribeToMore({
        document: NEWMESSAGE_SUBSCRIPTION,
        variables: { chatRoomName: chatRoomName },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          
          let temp = _.cloneDeep(prev);
          const newMsg = subscriptionData.data.newMessage;
          temp.chatRoom.messages.push(newMsg);
          // console.log(chatRoomName);
          
          // console.log('newMsg from');
          // console.log(newMsg);
          // openNotification();
          
          // info
          if ((newMsg.sender !== me['email']) && isLogin) {
            message.info(`${newMsg.senderNick}(${chatRoomName}): ${newMsg.content}`, 2);
          }
          
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