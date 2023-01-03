import { Avatar, Drawer, List, Layout, Button, Space } from "antd";
import { MehOutlined } from '@ant-design/icons';
import { useState } from "react";
import { IChatRoom } from "../../../Utils/ChatRoom/IChatRoom";
import { useMyContext } from "../../../Utils/useMyContext";

import CreateChatModal from './CreateChatModal';
import SecondLevelModal from './SecondLevelModal';
import PlsLogin from "../../../Components/HTML/components/PleaseLogIn";




interface IFirstLevelProps {
  chatRooms: IChatRoom[],
  chatRoomModalOpen: boolean,
  onClose(): void,
  handleCreate(name: String): void,
  showSecond(idx: number): void,
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
  const { chatRooms, chatRoomModalOpen, onClose, handleCreate, showSecond } = props;
  const { isLogin } = useMyContext();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        mask={false}
        onClose={onClose}
        open={chatRoomModalOpen}
      >
        <h2 style={{ display: 'inline', paddingRight: '20px' }}>Chats</h2>
        
        {/* check login */}
        {true?
          <>
            <CreateChatModal
              createOpen={createOpen}
              onOpen={() => setCreateOpen(true)}
              onCancel={() => setCreateOpen(false)}
              onCreate={handleCreate}
            />

            <List
              itemLayout="horizontal"
              dataSource={chatRooms}
              // header={
              //   <h3>Chats</h3>
              // }
              renderItem={(item, idx) => (
                <List.Item onClick={() => { showSecond(idx) }}>
                  <List.Item.Meta
                    avatar={<MehOutlined />}
                    title={<p>{item.name}</p>}
                    description={item.lastMsg}
                  />
                </List.Item>
              )}
            />

            <Button type="primary" onClick={() => showSecond(0)}>
              Two-level drawer
            </Button>
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

export default FirstLevelModal;