import React, { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip, Space, } from 'antd';
import { CommentOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';

import { useMyContext } from '../../../Utils/useMyContext';
import FirstLevelModal from './FirstLevelModal';


const ChatRoomModal = () => {
  const { chatRoomModalOpen, setChatRoomModalOpen } = useMyContext();

  const showChatRoomModal = () => {
    setChatRoomModalOpen(true);
  }

  // const onClose = () => {
  //   setChatRoomModalOpen(false);
  //   setChatRoomSecondLevel(false);
  // }

  // const createChatRoom = () => {
  //   return (
  //     <>
  //       <Button icon={<PlusOutlined />}>Create Chats</Button>
  //       <ChatRoomModal 
  //         open={createOpen}
  //         onCreate={handleCreate}
  //         onCancel={() => setModalOpen(false)}
  //       />
  //     </>
  //   )
  // }

  // const FirstLevelModal = () => {
  //   return (
  //     <>
  //       <Drawer
  //         title="Basic Drawer"
  //         placement="right"
  //         mask={false}
  //         onClose={onClose}
  //         open={chatRoomModalOpen}
  //       >
  //         {createChatRoom()}
  //         <p>Some contents...</p>
  //         <p>Some contents...</p>
  //         {SecondLevelModal()}
  //       </Drawer>
  //     </>
  //   )
  // }

  // const onForward = () => {
  //   setChatRoomSecondLevel(false);
  //   setChatRoomModalOpen(true);
  // }

  // const SecondLevelModal = () => {
  //   return (
  //     <>
  //       <Button type="primary" onClick={showSecondLevel}>
  //         Two-level drawer
  //       </Button>
  //       <Drawer
  //         title="Two-level Drawer"
  //         mask={false}
  //         closeIcon={<LeftOutlined />}
  //         onClose={onForward}
  //         open={chatRoomSecondLevel}
  //       >
  //         This is two-level drawer
  //       </Drawer>
  //     </>
  //   )
  // }

  return (
    <>
      <Button type="primary" shape="circle" onClick={showChatRoomModal} icon={<CommentOutlined />} style={{ float: 'right' }} />
      <FirstLevelModal
        chatRoomModalOpen={chatRoomModalOpen}
        onOpen={() => setChatRoomModalOpen(true)}
        onClose={() => setChatRoomModalOpen(false)}
      />
    </>
  )
}

export default ChatRoomModal;
