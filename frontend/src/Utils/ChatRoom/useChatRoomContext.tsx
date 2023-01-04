import { useState, useEffect, createContext, useContext } from "react";
import { IChatRoom, IMessage, INewMsg } from "./IChatRoom";
import _ from "lodash";
import { useMutation, useQuery } from "@apollo/client";
import { CHATROOM_QUERY, CREATE_CHATROOM_MUTATION, CREATE_MRSSAGE_MUTATION } from "../graphql/index";
import { message } from "antd";
import { useMyContext } from "../useMyContext";
import useBikeContext from "../../Containers/hooks/useBikeContext";


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
  messages: IMessage[],
  setMessages(x): void,
  // addChatRoom(x: IChatRoom): void,
  activeRoom: number,
  setActiveRoom(x): void,
  createChatBoxMutation(x: IChatRoom): any,

  handleCreate(x: IChatRoom): void,
  handleNewMsg(x: INewMsg): void,
}

const ChatRoomContext = createContext<IChatRoomContext>({
  // messages: [];

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
  messages: [],
  setMessages: (x) => { },
  activeRoom: 0,
  setActiveRoom: (x) => { },

  createChatBoxMutation: () => { },

  handleCreate: (x) => { },
  handleNewMsg: (x: INewMsg) => { },
});

const ChatRoomProvider = (props: any) => {

  // chat information
  const { me, chatRoomModalOpen, setChatRoomModalOpen } = useMyContext();
  const { setBikeEnabled } = useBikeContext();

  // Messages
  const [messages, setMessages] = useState();


  // Modal
  const [secondOpen, setSecondOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([{
    name: 'World Channel',
    // set later by query
    // messages: [],
    lastMsg: 'Chat with all!',
    // unread: 0,
  }]);
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
      // messages: [],
      lastMsg: 'Chat with your friends!',
      // unread: 0,
    })
  };

  /**
   * 
   * graphql
   * 
   */
  const [createChatBoxMutation] = useMutation(CREATE_CHATROOM_MUTATION);

  const handleCreate = (newChatroom: IChatRoom) => {
    console.log(newChatroom);
    // Open new chat box with friend
    if (chatRooms.some
      (({ name }) => name === newChatroom.name)) {
      message.error({ content: 'Chat room already opened!', duration: 0.75 })
    }

    // children will be update later
    setChatRooms([...chatRooms, defaultChatBox(newChatroom.name)]);

    // console.log(me);

    createChatBoxMutation({
      variables: {
        chatRoomName: newChatroom.name,
      }
    });
    message.success({ content: 'Chat room created.', duration: 0.75 });
  }

  const [createMessageMutation] = useMutation(CREATE_MRSSAGE_MUTATION);

  const handleNewMsg = (props: INewMsg) => {
    const { chatRoomName, sender, content } = props;
    createMessageMutation({
      variables: {
        chatRoomName,
        sender,
        content,
      }
    });
    message.success({ content: 'Sent!', duration: 0.75 })
  }


  return (
    <ChatRoomContext.Provider
      value={{
        secondOpen, setSecondOpen,
        createOpen, setCreateOpen,
        scrollToBottom, modalClose, showFirst, showSecond,
        chatRooms, setChatRooms,
        messages, setMessages,
        activeRoom, setActiveRoom,
        createChatBoxMutation,
        handleCreate,
        handleNewMsg,
      }}
      {...props}
    />
  );
}

// usage:
// const { "your state", ... } = useMyContext();
const useChatRoomContext = () => useContext(ChatRoomContext);

export { ChatRoomContext, ChatRoomProvider, useChatRoomContext };