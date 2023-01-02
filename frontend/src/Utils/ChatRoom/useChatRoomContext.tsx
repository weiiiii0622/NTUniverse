import { useState, useEffect, createContext, useContext } from "react";
import _ from "lodash";

interface IMessage {
  sender: string,
  content: string,
}

interface IChatRoom {
  name: string,
  messages: IMessage[],
  // children: React.ReactNode,
  unread: number,
};


interface IChatRoomContext {
  chatBoxes: IChatRoom[],
  setChatBoxes(x): void,
}

const ChatRoomContext = createContext<IChatRoomContext>({
  chatBoxes: [],
  setChatBoxes: (x) => { },
});

const ChatRoomProvider = (props: any) => {

  // chat information

  // const [friend, setFriend] = useState<string>('');
  // const [box, setBox] = useState<string>("");
  const [chatBoxes, setChatBoxes] = useState<IChatRoom[]>([]);

  // useEffect(() => {
  //   setBox(makeName(nick_name, friend));
  // }, [nick_name, friend]);

  // about messages
  // const [body, setBody] = useState<string>('');
  // const { loading: chatLoading, error, data: chatData } = useQueryChat({ nick_name, friend, box });
  // const { sendMessage, clearMessages } = useMessages({ nick_name, friend, box });




  return (
    <ChatRoomContext.Provider
      value={{
        chatBoxes, setChatBoxes,
      }}
      {...props }
    />
  );
}

// usage:
// const { "your state", ... } = useMyContext();
const useChatRoomContext = () => useContext(ChatRoomContext);

export { ChatRoomContext, ChatRoomProvider, useChatRoomContext };