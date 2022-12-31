import { Drawer } from "antd";
import { useState } from "react";

import CreateChatModal from './CreateChatModal';
import SecondLevelModal from './SecondLevelModal';

interface IFirstLevelProps {
  chatRoomModalOpen: boolean,
  onOpen(): void,
  onClose(): void,
  // onCreate: void,
}

const FirstLevelModal = (props: IFirstLevelProps) => {
  const { chatRoomModalOpen, onOpen, onClose } = props;
  const [createOpen, setCreateOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        mask={false}
        onClose={onClose}
        open={chatRoomModalOpen}
      >
        <CreateChatModal 
          createOpen={createOpen}
          onOpen={() => setCreateOpen(true)}
          onCancel={() => setCreateOpen(false)}
        />
        <p>Some contents...</p>
        <p>Some contents...</p>
        <SecondLevelModal 
          secondOpen={secondOpen}
          onForward={() => {
            onOpen();
            setSecondOpen(false);
          }}
          showSecondLevel={() => {
            onClose();
            setSecondOpen(true);
          }}  
        />
      </Drawer>
    </>
  )
}

export default FirstLevelModal;