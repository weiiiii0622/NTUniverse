import { useEffect, useRef, useState } from "react";
import { Drawer, Input } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import styled from "styled-components";
import useQueryChat from "../../../Containers/HTML/ChatRoom/hooks/useQueryChat";
import { useMyContext } from "../../../Utils/useMyContext";
import PlsLogin from "../components/PleaseLogIn";

interface ISecondLevelModal {

}

const MsgWrapper = styled.div`
  height: 92%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0px 5px 3px;
  gap: 2px;
  overflow: scroll;
  `;

const FootRef = styled.div`
    height: 10px;
  `;

const SecondLevelModal = () => {
  const { me, isLogin } = useMyContext();
  const { secondOpen, showFirst, chatRooms, messages, setMessages, activeRoom, handleNewMsg } = useChatRoomContext();
  const chatRoom = chatRooms[activeRoom];
  // const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, {
  //   variables: {
  //     chatRoomName: chatRoom.name,
  //   },
  //   fetchPolicy: "cache-and-network",
  // })
  const { loading, error, data } = useQueryChat({ chatRoomName: (chatRoom ? chatRoom.name : '世界頻道') });
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
    (e: any) => func(e.target.value);


  const msgFooterRef = useRef<HTMLDivElement>(null!);
  const scrollToBottom = () => {
    msgFooterRef!.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
  }

  useEffect(() => scrollToBottom(), [secondOpen]);
  useEffect(() => scrollToBottom(), [messages]);

  return (
    <>
      <Drawer
        title={chatRoom?.name}
        mask={true}
        closeIcon={<LeftOutlined />}
        onClose={showFirst}
        open={secondOpen}
        bodyStyle={{ paddingBottom: '12px' }}
      >
        {isLogin ?
          <>
            <MsgWrapper>
              {messages?.map(msg => <Message sender={msg.sender} content={msg.content} senderNick={msg.senderNick} key={uuidv4()} />)}
              <FootRef key={chatRoom.name + '-footer'} ref={msgFooterRef} />
            </MsgWrapper>

            <Input.Search
              enterButton='傳送'
              placeholder='輸入訊息...'
              value={body}
              onChange={handleChange(setBody)}
              onSearch={(val) => {
                handleNewMsg({
                  chatRoomName: chatRoom.name,
                  sender: me['email'],
                  senderNick: me['nick_name'],
                  content: val,
                });
                setBody('');
              }}
            ></Input.Search>
          </>

          :

          <>
            <PlsLogin />
          </>
        }
      </Drawer>
    </>
  )
}

export default SecondLevelModal;

