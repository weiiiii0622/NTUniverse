import React, { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip, Space, message, } from 'antd';
import { CommentOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';

import { useMyContext } from '../../../Utils/useMyContext';
import FirstLevelModal from '../../../Components/HTML/ChatRoom/FirstLevelModal';
import SecondLevelModal from '../../../Components/HTML/ChatRoom/SecondLevelModal';
import { useChatRoomContext } from '../../../Utils/ChatRoom/useChatRoomContext';
import useQueryChat from './hooks/useQueryChat';



const ChatRoomModal = () => {
  const { me } = useMyContext();
  const nick_name = me['nick_name'];
  const {
    secondOpen, showFirst,
  } = useChatRoomContext();

  // modal
 

  return (
    <div style={{ position: 'absolute', zIndex: 100, right: '20px', bottom: '40px' }}>
      <Button 
        type='primary' 
        shape='circle' 
        size='large'
        onClick={showFirst} 
        icon={<CommentOutlined />} 
        style={{ float: 'right' }} 
      />
      <FirstLevelModal />
      <SecondLevelModal />
    </div>
  )
}

export default ChatRoomModal;
