import { Drawer, List, Card } from "antd";
import { MehOutlined } from '@ant-design/icons';
import { useMyContext } from "../../../Utils/useMyContext";
import CreateChatModal from './CreateChatModal';
import PlsLogin from "../../../Components/HTML/components/PleaseLogIn";
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import Icon from '../../../Utils/ChatRoom/Icon';

interface IFirstLevelProps {

}


const FirstLevelModal = (props: IFirstLevelProps) => {
  const { showSecond, chatRooms, activeRoom, setActiveRoom, modalClose } = useChatRoomContext();
  const { isLogin, chatRoomModalOpen, setChatRoomModalOpen } = useMyContext();

  return (
    <>
      <Drawer
        title={<h3 style={{ margin: '5px' }}>聊天室</h3>}
        placement="right"
        mask={true}
        onClose={modalClose}
        open={chatRoomModalOpen}
        bodyStyle={{ paddingTop: '5px' }}
      >

        {/* check login */}
        {isLogin ?
          <>
            <CreateChatModal />
            <div style={{
              position: 'absolute',
              paddingTop: '10px',
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
                    style={{
                      marginTop: '2px',
                      // borderColor: 'grey',
                      // borderBlockWidth: '0.5px'
                    }}
                    hoverable={true}
                    bordered={true}
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
                          marginBottom: '0',
                        }}
                        avatar={
                          <div style={{ position: 'relative', top: '16px' }}>
                            <Icon x={item.icon} />
                          </div>
                        }
                        title={
                          <h3 style={{}}>{item.name}</h3>
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