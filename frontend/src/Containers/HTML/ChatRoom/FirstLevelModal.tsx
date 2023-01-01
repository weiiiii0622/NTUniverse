import { Avatar, Drawer, List, Layout } from "antd";
import { useState } from "react";

import CreateChatModal from './CreateChatModal';
import SecondLevelModal from './SecondLevelModal';




interface IFirstLevelProps {
  chatRoomModalOpen: boolean,
  onOpen(): void,
  onClose(): void,
  // onCreate: void,
}

// test data
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const FirstLevelModal = (props: IFirstLevelProps) => {
  const { chatRoomModalOpen, onOpen, onClose } = props;
  const [createOpen, setCreateOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
//   const {
//     modalOpen,
//     setModalOpen,
//     handleCreate,
//     handleEdit,
// } = useModal({ me, friend, setFriend, chatBoxes, setChatBoxes, scrollToBottom });


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
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, idx) => (
            <List.Item onClick={() => console.log(`click${idx}`)}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<p>{item.title}</p>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />

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