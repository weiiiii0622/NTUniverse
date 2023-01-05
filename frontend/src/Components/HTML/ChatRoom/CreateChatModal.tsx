import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Affix, Tag, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useChatRoomContext } from "../../../Utils/ChatRoom/useChatRoomContext";
import { useMyContext } from "../../../Utils/useMyContext";

interface ICreateChatModal {

}

// const IconWrapper = styled.div`
//   height: 40px;
//   width: 100;
//   display: flex;
//   justify-content: space-between;
//   align-content: center;
//   overflow: scroll;
//   padding: 0 2px 0 2px;
// `;

const CreateChatModal = (props: ICreateChatModal) => {

  const { me } = useMyContext();
  const myEmail = me['email'];
  const { handleCreate, createOpen, setCreateOpen } = useChatRoomContext();

  const [form] = Form.useForm();

  // const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        // console.log(users);

        handleCreate({
          name: values.name,
          icon: 0,  // set ro degalul
          // lastMsg: 'Chat with your friends!',
        });
        form.resetFields();
        setCreateOpen(false);
      })
      .catch((e) => {
        console.error(e);
      })
  }

  return (
    <>
      <div>
        <Button style={{ marginBottom: '5px' }} icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>建立聊天室</Button>
      </div>
      {/* <div style={{ position: 'sticky', top: 0 }}>
      </div>
       */}
      <Modal
        title="建立聊天室"
        okText="建立"
        cancelText="取消"
        open={createOpen}
        onOk={() => submit()}
        onCancel={() => { setCreateOpen(false) }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="聊天室名稱"
            rules={[{
              required: true,
              message: '錯誤：請輸入聊天室名稱',
            },]}
          >
            <Input
              onKeyDown={e => {
                if (e.key === 'Enter') submit();
              }}
            />
          </Form.Item>
        </Form>

      {/* <IconWrapper>
        {[0,1,2,3,4,5,6,7,8,9].map((x) => <Icon x={x} />)}
      </IconWrapper> */}

      </Modal>
    </>
  )
}

export default CreateChatModal;