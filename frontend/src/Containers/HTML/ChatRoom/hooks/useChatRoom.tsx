import { useMutation } from "@apollo/client";
import { message } from "antd";
import { useEffect, useState } from "react";
import { IChatRoom, IMessage } from "../../../../Utils/ChatRoom/IChatRoom";
import { CREATE_CHATROOM_MUTATION } from '../../../../Utils/graphql';
import { create } from "lodash";
import { useMyContext } from "../../../../Utils/useMyContext";

interface IProps {

}

const useChatRoom = (props: IProps) => {
  const { me } = useMyContext();
  const nick_name = me['nick_name'];

  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  // TODEL:
  useEffect(() => {
    //console.log(chatRooms);
  }, [chatRooms]);

  const defaultChatBox = (chatRoomName: string): IChatRoom => {
    return ({
      name: chatRoomName,
      // set later by query
      // messages: [],
      lastMsg: 'Chat with your friends!',
      // unread: 0,
    })
  };

  const [createChatBoxMutation] = useMutation(CREATE_CHATROOM_MUTATION);

  const handleCreate = (newChatroom: any) => {
    // console.log(newChatroom);
    // Open new chat box with friend
    if (chatRooms.some
      (({ name }) => name === newChatroom.chatRoomName)) {
      message.error({ content: 'Chat room already opened!', duration: 0.75 });
      return;
    }

    // children will be update later
    setChatRooms([...chatRooms, defaultChatBox(newChatroom.chatRoomName)]);

    // console.log(me);

    createChatBoxMutation({
      variables: {
        chatRoomName: newChatroom.chatRoomName, 
        users: newChatroom.users,
      }
    })

    message.success({ content: 'Chat room created.', duration: 0.75 })
    
  }
  return { chatRooms, setChatRooms, nick_name, handleCreate };
}

export default useChatRoom;