import { useState, useEffect, createContext, useContext } from "react";
import { IChatRoom, IMessage, INewMsg } from "./IChatRoom";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { CHATROOM_QUERY, CREATE_CHATROOM_MUTATION, CREATE_MRSSAGE_MUTATION } from "../graphql/index";
import { message } from "antd";
import { useMyContext } from "../useMyContext";
import useBikeContext from "../../Containers/hooks/useBikeContext";


interface IChatRoomContext {
  secondOpen: boolean,
  setSecondOpen(x): void,
  createOpen: boolean,
  setCreateOpen(x): void,
  modalClose(): void,
  showFirst(): void,
  showSecond(): void,

  chatRooms: IChatRoom[],
  setChatRooms(x): void,
  messages: IMessage[],
  setMessages(x): void,
  activeRoom: number,
  setActiveRoom(x): void,
  createChatBoxMutation(x: IChatRoom): any,

  handleCreate(x: IChatRoom): void,
  handleNewMsg(x: INewMsg): void,
}

const ChatRoomContext = createContext<IChatRoomContext>({

  secondOpen: false,
  setSecondOpen: (x) => { },
  createOpen: false,
  setCreateOpen: (x) => { },
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
    name: '世界頻道',
    icon: 0,
  }]);
  // TODEL:
  useEffect(() => {
    //console.log(chatRooms);
  }, [chatRooms]);
  const [activeRoom, setActiveRoom] = useState(0);

  const modalClose = () => {
    setChatRoomModalOpen(false);
    setSecondOpen(false);
    setBikeEnabled(true);
    //console.log('chat close!');
  }

  const showFirst = () => {
    setChatRoomModalOpen(true);
    setSecondOpen(false);
    setBikeEnabled(false);
    //console.log('first');
    
  }

  const showSecond = () => {
    setChatRoomModalOpen(false);
    setSecondOpen(true);
    setBikeEnabled(false);
    //console.log('second');
  }

  const defaultChatBox = (chatRoomName: string): IChatRoom => {
    return ({
      name: chatRoomName,
      icon: Math.floor(Math.random()*10),
      // set later by query
      // messages: [],
      // lastMsg: 'Chat with your friends!',
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
    // console.log(newChatroom);
    // Open new chat box with friend
    if (chatRooms.some
      (({ name }) => name === newChatroom.name)) {
      message.error({ content: '重複的聊天室！', duration: 0.75 });
      return;
    }

    // children will be update later
    setChatRooms([
      ...chatRooms, 
      { name: newChatroom.name, icon: Math.floor(Math.random()*10), }
    ]);

    // console.log(me);

    createChatBoxMutation({
      variables: {
        chatRoomName: newChatroom.name,
      }
    });
    message.success({ content: `已建立聊天室：${newChatroom.name}！`, duration: 0.75 });
  }

  const [createMessageMutation] = useMutation(CREATE_MRSSAGE_MUTATION);

  const handleNewMsg = (props: INewMsg) => {
    const { chatRoomName, sender, senderNick, content } = props;
    createMessageMutation({
      variables: {
        chatRoomName,
        sender,
        senderNick,
        content,
      }
    });
    message.success({ content: '已傳送!', duration: 0.75 })
  }


  return (
    <ChatRoomContext.Provider
      value={{
        secondOpen, setSecondOpen,
        createOpen, setCreateOpen,
        modalClose, showFirst, showSecond,
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