import { message } from "antd";
import { useEffect, useState } from "react";
import { IChatRoom, IMessage } from "../../../../Utils/ChatRoom/IChatRoom";

interface IProps {
  me: object,
}

const useChatRoom = (props: IProps) => {
  const { me } = props;
  const nick_name = me['nick_name'];

  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  // TODEL:
  useEffect(() => {
    console.log(chatRooms);
  }, [chatRooms]);

  const defaultChatBox = (chatRoomName: string): IChatRoom => {
    return ({
      name: chatRoomName,
      // set later by query
      messages: [],
      lastMsg: 'Chat with your friends!',
      unread: 0,
    })
  };

  const handleCreate = (newName: string) => {
    console.log('created!');
    console.log(newName);
    // Open new chat box with friend
    if (chatRooms.some
      (({ name }) => name === newName)) {
      message.error({ content: 'Chat room already opened!', duration: 0.75 })
    }

    // children will be update later
    setChatRooms([...chatRooms, defaultChatBox(newName)]);

    message.success({ content: 'Chat room created.', duration: 0.75 })
    
  }
  return { chatRooms, setChatRooms, nick_name, handleCreate };
}

export default useChatRoom;