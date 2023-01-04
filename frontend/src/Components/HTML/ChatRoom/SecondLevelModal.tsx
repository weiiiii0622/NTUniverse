import { Button, Drawer, Input } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import Message from './Message';
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import styled from "styled-components";
import { IChatRoom } from "../../../Utils/ChatRoom/IChatRoom";
import useQueryChat from "../../../Containers/HTML/ChatRoom/hooks/useQueryChat";
import { useQuery } from "@apollo/client";
import { CHATROOM_QUERY } from "../../../Utils/graphql";
import { useEffect, useRef, useState } from "react";
import { useMyContext } from "../../../Utils/useMyContext";

interface ISecondLevelModal {

}

const MsgWrapper = styled.div`
  height: 90%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 4px 5px;
  gap: 10px;
  overflow: scroll;
  `;
  
  const FootRef = styled.div`
    height: 10px;
  `;

const SecondLevelModal = () => {
  const { me } = useMyContext();
  const { secondOpen, showFirst, chatRooms, messages, setMessages, activeRoom, handleNewMsg } = useChatRoomContext();
  const chatRoom = chatRooms[activeRoom];
  // const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, {
  //   variables: {
  //     chatRoomName: chatRoom.name,
  //   },
  //   fetchPolicy: "cache-and-network",
  // })
  const { loading, error, data } = useQueryChat({ chatRoomName: chatRoom.name });
  // console.log(data);
  // let messages = data?.chatRoom.messages;

  // update messages
  useEffect(() => {
    setMessages(data?.chatRoom.messages);
  }, [messages, data]);

  // console.log('messages');

  // console.log(messages);


  // console.log('t');

  // console.log(t);

  const [body, setBody] = useState<string>('');
  const handleChange = (func: (value: any) => void) =>
    (e: React.SyntheticEvent) => func(e.target.value);


  const msgFooterRef = useRef<HTMLDivElement>(null!);
  const scrollToBottom = () => {
    msgFooterRef!.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
  }

  useEffect(() => scrollToBottom());
  useEffect(() => scrollToBottom(), [data]);


  return (
    <>
      <Drawer
        title={chatRoom?.name}
        mask={false}
        closeIcon={<LeftOutlined />}
        onClose={showFirst}
        open={secondOpen}
      >
        <MsgWrapper>
          {messages?.map(msg => <Message key={msg.sender+msg.content} sender={msg.sender} content={msg.content} />)}
          <FootRef key={chatRoom.name + '-footer'} ref={msgFooterRef} />

        </MsgWrapper>


        <Input.Search
          enterButton="Send"
          placeholder="Type a message here..."
          value={body}
          onChange={handleChange(setBody)}
          onSearch={(val) => {
            handleNewMsg({
              chatRoomName: chatRoom.name,
              sender: me['email'],
              content: val,
            });
            setBody('');
          }}
        ></Input.Search>
      </Drawer>
    </>
  )
}

export default SecondLevelModal;

