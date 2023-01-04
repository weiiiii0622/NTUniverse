import { Avatar, Drawer, List, Layout, Button, Space } from "antd";
import { MehOutlined } from '@ant-design/icons';
import { useState } from "react";
import { IChatRoom } from "../../../Utils/ChatRoom/IChatRoom";
import { useMyContext } from "../../../Utils/useMyContext";

import CreateChatModal from './CreateChatModal';
import SecondLevelModal from './SecondLevelModal';
import PlsLogin from "../../../Components/HTML/components/PleaseLogIn";
import UsersModal from "./UsersModal";
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";




interface IFirstLevelProps {

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
  const { showSecond, chatRooms, activeRoom, setActiveRoom } = useChatRoomContext();
  const { isLogin, chatRoomModalOpen , setChatRoomModalOpen } = useMyContext();

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        mask={false}
        onClose={() => setChatRoomModalOpen(false)}
        open={chatRoomModalOpen}
      >
        <h2 style={{ display: 'inline', paddingRight: '20px' }}>Chats</h2>

        {/* check login */}
        {true ?
          <>
            <CreateChatModal />

            {/* <UsersModal
              me={me}
              addUsersOpen={() => {
                setAddUsersOpen(true);
                setCreateOpen(false);
              }}
              onOk={handleCreate}
              onCancel={ }
              setStatus={ }
            /> */}

            <List
              itemLayout="horizontal"
              dataSource={chatRooms}
              // header={
              //   <h3>Chats</h3>
              // }
              renderItem={(item, idx) => (
                <List.Item onClick={() => {
                  setActiveRoom(idx);
                  showSecond();
                }}>
                  <List.Item.Meta
                    avatar={<MehOutlined />}
                    title={<p>{item.name}</p>}
                    description={item.lastMsg}
                  />
                </List.Item>
              )}
            />

            {/* <Button type="primary" onClick={() => showSecond()}>
              Two-level drawer
            </Button> */}
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