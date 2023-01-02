import { useState } from "react"
import React from "react"
import { useMutation } from "@apollo/client";
import { CLEAR_MESSAGES_MUTATION, CREATE_MESSAGE_MUTATION } from "../../graphql";

interface useMessagesProps {
  nick_name: string,
  friend: string,
  box: string,
};

const useMessages = (props: useMessagesProps) => {

  const { nick_name, friend, box } = props;

  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const sendMessage = ({ body = "" }) => {
    createMessage({
      variables: {
        from: nick_name,
        to: friend,
        body,
      }
    })
  };

  // TODEL:
  const [clearMessagesMutation] = useMutation(CLEAR_MESSAGES_MUTATION);

  const clearMessages = () => {
    clearMessagesMutation({
      variables: {
        name: box,
      },
    });
  }

  return { sendMessage, clearMessages };
}

export default useMessages;