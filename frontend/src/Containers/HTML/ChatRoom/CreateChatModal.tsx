import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Affix } from "antd";
import { PlusOutlined } from '@ant-design/icons';

interface ICreateChatModal {
  createOpen: boolean,
  onOpen(): void,
  onCancel(): void,
  onCreate(name: string): void,
}

const CreateChatModal = (props: ICreateChatModal) => {

  const { createOpen, onOpen, onCancel, onCreate } = props;

  const [form] = Form.useForm();
  const inputRef = useRef();
  // const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values.name);
        form.resetFields();
      })
      .catch((e) => {
        console.error(e);
      })
      onCancel();
  }

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={onOpen}>Create Chats</Button>
      {/* <div style={{ position: 'sticky', top: 0 }}>
      </div>
       */}
      <Modal
        title="Create a new chat room"
        okText="Create"
        cancelText="Cancel"
        open={createOpen}
        onOk={() => submit()}
        onCancel={onCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{
              required: true,
              message: 'Error: Please enter the name of the person to chat!',
            },]}
          >
            <Input
            // onKeyDown={e => {
            //     if (e.key === 'Enter') submit();
            // }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateChatModal;