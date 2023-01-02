import React, { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip, Space, message, } from 'antd';
import { CommentOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';

import { useMyContext } from '../../../Utils/useMyContext';
import { IChatRoom, IMessage } from '../../../Utils/ChatRoom/IChatRoom';
import FirstLevelModal from './FirstLevelModal';
import useModal from './hooks/useModal';
import { useChatRoomContext } from '../../../Utils/ChatRoom/useChatRoomContext';
import makeName from '../../../Utils/ChatRoom/makeName';
import useQueryChat from './hooks/useQueryChat';
import useMessages from './hooks/useMessages';
import useChatRoom from './hooks/useChatRoom';


const ChatRoomModal = () => {
  const { me } = useMyContext();
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


  const showChatRoomModal = () => {
    setChatRoomModalOpen(true);
    setBikeEnabled(false);
  }


  return (
    <div style={{ position: 'absolute', right: '40px', bottom: '100px' }}>
      <Button type="primary" shape="circle" onClick={showChatRoomModal} icon={<CommentOutlined />} style={{ float: 'right' }} />
      <FirstLevelModal
        chatRoomModalOpen={chatRoomModalOpen}
        onOpen={() => {
          setChatRoomModalOpen(true);
          setBikeEnabled(false);
        }}
        onClose={() => {
          setChatRoomModalOpen(false)
          setBikeEnabled(true);
        }}
        handleCreate={handleCreate}
      />
    </div>
  )
}

export default ChatRoomModal;
