import { useQuery } from '@apollo/client';
import React from 'react';
import { ChatBoxSchema, CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from '../../graphql';
import { useEffect, useState } from "react"
import _ from 'lodash';


interface useQueryChatProps {
  nick_name: string,
  friend: string,
  box: string;
}


const useQueryChat = (props: useQueryChatProps) => {

  const { nick_name, friend, box } = props;

  const { loading, error, data, subscribeToMore } = useQuery(
    CHATBOX_QUERY, {
    variables: {
      name: box,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    try {
      return subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { from: nick_name, to: friend },
        updateQuery: (prev: { chatBox: ChatBoxSchema }, { subscriptionData }) => {
          if (!subscriptionData)
            return prev;

          console.log(subscriptionData.data.message.message);
          const mutationType = subscriptionData.data.message.mutation;
          const newData = _.cloneDeep(prev);

          switch (mutationType) {
            case "CREATE": {
              const newMessage = subscriptionData.data.message.message;
              newData.chatBox.messages.push(newMessage);
              break;
            }
            case "CLEAR": {
              newData.chatBox.messages = [];
              break;
            }
          }
          return newData;
        }
      })
    } catch (e) {
      console.error(e);
    }
  }, [box, subscribeToMore]);

  return { loading, error, data };
}

export default useQueryChat;