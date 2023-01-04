import { Button, Drawer, Input } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import Message from './Message';
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import styled from "styled-components";
import { IChatRoom } from "../../../Utils/ChatRoom/IChatRoom";

interface ISecondLevelModal {

}

const MsgWrapper = styled.div`
  height: 90%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
  margin: 4px 5px;
  gap: 10px;
  overflow: scroll;
`;

const SecondLevelModal = () => {
  const { secondOpen, showFirst, chatRooms, activeRoom } = useChatRoomContext();
  const chatRoom = chatRooms[activeRoom];
  console.log('chatRoom: ');
  console.log(chatRoom);
  return (
    <>
      <Drawer
        title={chatRoom?.name}
        mask={false}
        closeIcon={<LeftOutlined />}
        onClose={showFirst}
        open={secondOpen}
      >
        <MsgWrapper>
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
          <Message sender={'1'} content={'hi'} />
        </MsgWrapper>


        <Input.Search
          enterButton="Send"
          placeholder="Type a message here..."
        // value={body}
        // onChange={handleChange(setBody)}
        // disabled={friend === ''}
        // onSearch={(msg) => {
        //     if (msg) {
        //         sendMessage({ body: msg });
        //         setBody('');
        //     } else {
        //         message.warning({ content: 'Message is empty.', duration: 0.5 });
        //     }
        // }}
        ></Input.Search>
      </Drawer>
    </>
  )
}

export default SecondLevelModal;

