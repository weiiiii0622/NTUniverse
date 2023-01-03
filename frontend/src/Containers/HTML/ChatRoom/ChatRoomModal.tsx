import React, { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip, Space, message, } from 'antd';
import { CommentOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';

import { useMyContext } from '../../../Utils/useMyContext';
import { IChatRoom, IMessage } from '../../../Utils/ChatRoom/IChatRoom';
import PlsLogin from '../../../Components/HTML/components/PleaseLogIn';
import FirstLevelModal from '../../../Components/HTML/ChatRoom/FirstLevelModal';
import SecondLevelModal from '../../../Components/HTML/ChatRoom/SecondLevelModal';
import useModal from './hooks/useModal';
import { useChatRoomContext } from '../../../Utils/ChatRoom/useChatRoomContext';
import makeName from '../../../Utils/ChatRoom/makeName';
import useQueryChat from './hooks/useQueryChat';
import useMessages from './hooks/useMessages';
import useChatRoom from './hooks/useChatRoom';


const ChatRoomModal = () => {
  const { me } = useMyContext();
  const [secondOpen, setSecondOpen] = useState(false);
  const { chatRooms, setChatRooms, nick_name, handleCreate } = useChatRoom({ me });

  // chat information
  // const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);

  // useEffect(() => {
  //   setBox(makeName(nick_name, friend));
  // }, [nick_name, friend]);

  // about messages
  // const [body, setBody] = useState<string>('');
  // const { loading: chatLoading, error, data: chatData } = useQueryChat({ nick_name, friend, box });
  // const { sendMessage, clearMessages } = useMessages({ nick_name, friend, box });
  // put in second
  // const { loading: chatLoading, error, data: chatData } = useQueryChat({ nick_name, friend, box });





  // modal
  const { chatRoomModalOpen, setChatRoomModalOpen, setBikeEnabled } = useMyContext();

  // TODO:
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


  return (
    <div style={{ position: 'absolute', zIndex: 100, right: '40px', bottom: '200px' }}>
      <Button type="primary" shape="circle" onClick={showFirst} icon={<CommentOutlined />} style={{ float: 'right' }} />
      <FirstLevelModal
        chatRooms={chatRooms}
        chatRoomModalOpen={chatRoomModalOpen}
        onClose={modalClose}
        handleCreate={handleCreate}
        showSecond={showSecond}
      />
      <SecondLevelModal
        secondOpen={secondOpen}
        onForward={showFirst}
        showSecond={showSecond}
      />
    </div>
  )
}

export default ChatRoomModal;
