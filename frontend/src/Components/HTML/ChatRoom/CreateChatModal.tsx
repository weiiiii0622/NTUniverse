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
  const [form2] = Form.useForm();
	const [users, setUsers] = useState([me]);
	const [username, setUsername] = useState('');

  // const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values.name);
        form.resetFields();
        onCancel();
      })
      .catch((e) => {
        console.error(e);
      })
  }

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={onOpen}>建立聊天室</Button>
      {/* <div style={{ position: 'sticky', top: 0 }}>
      </div>
       */}
      <Modal
        title="建立聊天室"
        okText="建立"
        cancelText="取消"
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

        <Form form={form2} layout="vertical" name="form_in_modal">
				<Form.Item
					name="username"
					label="User"
				>
					<Input.Search
						enterButton={<Button type="primary">add</Button>}
						placeholder="User name"
						value={username}
						onChange={e => setUsername(e.target.value)}
						onSearch={value => {
							if (users.find(user => user === value)) {
								setStatus({ type: 'error', msg: 'User already in chat room.' })
							} else {
								setUsers([...users, value]);
							}
							form.resetFields(['username']);
						}}
					/>
				</Form.Item>
			</Form>
			{
				users.map(user => <Tag color="blue" key={user}>{user}</Tag>)
			}
      </Modal>
    </>
  )
}

export default CreateChatModal;