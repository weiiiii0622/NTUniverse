import { Button, Tag, Form, Input, Modal } from "antd"
import { useEffect, useRef, useState } from "react";

const UsersModal = ({ me, open, onOk, onCancel, setStatus }) => {

	const [form] = Form.useForm();
	const [users, setUsers] = useState([me]);
	const [username, setUsername] = useState('');

	const submit = () => {
		form
			.validateFields()
			.then((values) => {
				form.resetFields();
				onOk(users);
				setUsers([me]);
			})
			.catch((e) => {
				console.error(e);
			})
	}

	return (
		<Modal
			title="Add users to new chat room (1~10, including yourself)"
			okText="Ok!"
			cancelText="Cancel"
			open={open}
			onOk={() => submit()}
			onCancel={() => {
				onCancel();
				form.resetFields();
				setUsers([]);
			}}
		>
			<Form form={form} layout="vertical" name="form_in_modal">
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
	)
}

export default UsersModal;