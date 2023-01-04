import { useState, useEffect, createContext, useContext } from "react";
import { IChatRoom, IMessage } from "./IChatRoom";
import _ from "lodash";
import { useMutation, useQuery } from "@apollo/client";
import { CHATROOM_QUERY, CREATE_CHATROOM_MUTATION } from "../graphql/index";
import { message } from "antd";
import { useMyContext } from "../useMyContext";


interface IChatRoomContext {
  secondOpen: boolean,
  setSecondOpen(x): void,
  createOpen: boolean,
  setCreateOpen(x): void,
  scrollToBottom(): void,
  modalClose(): void,
  showFirst(): void,
  showSecond(): void,

  chatRooms: IChatRoom[],
  setChatRooms(x): void,
  // addChatRoom(x: IChatRoom): void,
  activeRoom: number,
  setActiveRoom(x): void,
  createChatBoxMutation: any,

  handleCreate(x): void,

}

const ChatRoomContext = createContext<IChatRoomContext>({
  secondOpen: false,
  setSecondOpen: (x) => { },
  createOpen: false,
  setCreateOpen: (x) => { },
  scrollToBottom: () => { },
  modalClose: () => { },
  showFirst: () => { },
  showSecond: () => { },

  chatRooms: [],
  setChatRooms: (x) => { },
  // addChatRoom: (x: IChatRoom) => { },
  activeRoom: 0,
  setActiveRoom: (x) => { },

  createChatBoxMutation: () => { },

  handleCreate: () => { },
});

const ChatRoomProvider = (props: any) => {

  // chat information

  // const [friend, setFriend] = useState<string>('');
  // const [box, setBox] = useState<string>("");
  const { me, chatRoomModalOpen, setChatRoomModalOpen, setBikeEnabled } = useMyContext();

  // Modal
  const [secondOpen, setSecondOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  // TODEL:
  useEffect(() => {
    console.log(chatRooms);
  }, [chatRooms]);
  const [activeRoom, setActiveRoom] = useState(0);

  const scrollToBottom = () => { }

  const modalClose = () => {
    setChatRoomModalOpen(false);
    setSecondOpen(false);
    setBikeEnabled(true);
  }

  const showFirst = () => {
    setChatRoomModalOpen(true);
    setSecondOpen(false);
    setBikeEnabled(false);
  }

  const showSecond = (x: number) => {
    console.log(x);

    setChatRoomModalOpen(false);
    setSecondOpen(true);
    setBikeEnabled(false);
  }

  const defaultChatBox = (chatRoomName: string): IChatRoom => {
    return ({
      name: chatRoomName,
      // set later by query
      messages: [],
      lastMsg: 'Chat with your friends!',
      unread: 0,
    })
  };

  /**
   * 
   * graphql
   * 
   */
  const [createChatBoxMutation] = useMutation(CREATE_CHATROOM_MUTATION);

  const handleCreate = (newChatroom: any) => {
    console.log(newChatroom);
    // Open new chat box with friend
    if (chatRooms.some
      (({ name }) => name === newChatroom.chatRoomName)) {
      message.error({ content: 'Chat room already opened!', duration: 0.75 })
    }

    // children will be update later
    setChatRooms([...chatRooms, defaultChatBox(newChatroom.chatRoomName)]);

    console.log(me);

    createChatBoxMutation({
      variables: {
        chatRoomName: newChatroom.chatRoomName,
        users: newChatroom.users,
      }
    })
    message.success({ content: 'Chat room created.', duration: 0.75 });
  }

  

  return (
    <ChatRoomContext.Provider
      value={{
        secondOpen, setSecondOpen,
        createOpen, setCreateOpen,
        scrollToBottom, modalClose, showFirst, showSecond,
        chatRooms, setChatRooms,
        activeRoom, setActiveRoom,
        createChatBoxMutation,
        handleCreate,
      }}
      {...props}
    />
  );
}

// usage:
// const { "your state", ... } = useMyContext();
const useChatRoomContext = () => useContext(ChatRoomContext);

export { ChatRoomContext, ChatRoomProvider, useChatRoomContext };