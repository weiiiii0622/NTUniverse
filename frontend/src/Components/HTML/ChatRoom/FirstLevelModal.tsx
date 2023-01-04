import { Avatar, Drawer, List, Layout, Button, Space, Card, Col, Row } from "antd";
import { MehOutlined } from '@ant-design/icons';
import { useState } from "react";
import { IChatRoom } from "../../../Utils/ChatRoom/IChatRoom";
import { useMyContext } from "../../../Utils/useMyContext";

import CreateChatModal from './CreateChatModal';
import SecondLevelModal from './SecondLevelModal';
import PlsLogin from "../../../Components/HTML/components/PleaseLogIn";
import UsersModal from "./UsersModal";
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import useQueryChat from "../../../Containers/HTML/ChatRoom/hooks/useQueryChat";
import { CHATROOM_QUERY } from "../../../Utils/graphql";
import { useQuery } from "@apollo/client";
import { describe } from "node:test";




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
  const { showSecond, chatRooms, activeRoom, setActiveRoom, setChatRooms } = useChatRoomContext();
  const { isLogin, chatRoomModalOpen, setChatRoomModalOpen } = useMyContext();

  return (
    <>
      <Drawer
        title={<h3 style={{ margin: '5px' }}>聊天室</h3>}
        placement="right"
        mask={false}
        onClose={() => setChatRoomModalOpen(false)}
        open={chatRoomModalOpen}
        bodyStyle={{ paddingTop: '5px' }}
      >

        {/* check login */}
        {isLogin ?
          <>
            <CreateChatModal />
            <div style={{
              position: 'absolute',
              bottom: 0,
              height: '86%',
              width: '330px',
              overflow: 'scroll',
            }}>
              <List
                itemLayout="horizontal"
                dataSource={chatRooms}
                // loading={true}
                renderItem={(item, idx) => (
                  <Card
                    style={{}}
                    hoverable={true}
                  >
                    <List.Item
                      style={{
                        height: '30px',
                      }}
                      onClick={() => {
                        setActiveRoom(idx);
                        showSecond();
                      }}
                    >
                      <List.Item.Meta
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        avatar={
                          <div style={{ position: 'relative', top: '16px' }}>
                            <MehOutlined
                              style={{ fontSize: '200%', }}
                            />
                          </div>
                        }
                        title={
                          <h3 style={{ display: 'inline' }}>{item.name}</h3>
                        }
                      // description={item.lastMsg}
                      />
                    </List.Item>
                  </Card>
                )}
              />
            </div>

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