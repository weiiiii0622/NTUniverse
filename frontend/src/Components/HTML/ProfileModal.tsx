import React, { useState, useEffect } from 'react';
import { 
    Form,
    Input,
    Button,
    Modal, 
    Row,
    Col,
    Image,
    message 
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';




const ProfileModal = () => {
    const { profileModalOpen, setProfileModalOpen, updateUser, me } = useMyContext();
    const [ loading, setLoading ] = useState(false);

    const clientId = '400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com';

    const onSuccess = async () => {
        //console.log('success:', res);
        // setLoading(true);
        // let user = await updateUser({
        //     variables:{
        //         email: info['email'],
        //         first_name: info['given_name'],
        //         last_name: info['family_name'],
        //         picture: info['picture'],
        //     }
        // })
        // console.log(user);
        // await handleLoading(user.data.createUser);
        
    };

    const [form] = Form.useForm();
    useEffect(() => {
        console.log("Hi");
        form.setFieldsValue({
            nick_name: me['nick_name'],
            description: me['description'],
        });
    }, [me])

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const onFinish = () => {
        
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };


    const handleSave =  async () => {
        //setModalText('The modal will be closed after two seconds');
        setLoading(true);
        setTimeout(() => {
        message.success('更新個人資料成功！');
          setProfileModalOpen(false);
          setLoading(false);
          //alert(`歡迎回來 ${first_name}`);
        }, 1000);
    };

    return (
        <>
            <Modal
                title="個人資料 👤"
                centered
                open={profileModalOpen}
                //onOk={handleOk}
                onCancel={() => setProfileModalOpen(false)}
                width={"50vw"}
                bodyStyle={{
                    //display: 'block',
                    overflow: 'auto',
                    height: '70vh',
                    padding: 'inherit'
                    //justifyContent: 'center'
                }}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleSave}>
                      Save
                    </Button>,
                ]}
            >
            <>
                <Form
                    form={form}
                    labelCol={{ offset: 5}}
                    wrapperCol={{ span: 20, offset: 0}}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        nick_name: "Hi"
                    }}
                    //onValuesChange={onFormLayoutChange}
                    //disabled={componentDisabled}
                >
                    
                    <Form.Item label="個人照片">
                        <Image
                            style={{
                                borderRadius: '50%',
                            }}
                            width={150}
                            src={me['picture']}
                            fallback="data:image/png;base64,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"
                        />
                    </Form.Item>

                    <Form.Item label="全名">
                        <Input.Group>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Input name="名" disabled={true} value={me['first_name']}/>
                                </Col>
                                <Col span={8}>
                                <Input name="姓" disabled={true} value={me['last_name']}/>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="Email"  wrapperCol={{span:15}}>
                        <Input name="Email" disabled={true} value={me['email']}/>
                    </Form.Item>
                    <Form.Item name="nick_name" label="暱稱"  wrapperCol={{span:20}} >
                        <Input placeholder={"幫自己取個暱稱吧"}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="想說的話"
                        //rules={[{ required: false, message: 'Please input Intro' }]}
                    >
                        <Input.TextArea rows={4} autoSize={{ minRows: 6 }} showCount maxLength={500}  placeholder="你還沒留下任何訊息"/>
                    </Form.Item>

                    {/* <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item> */}
                </Form>
            </>
                                    
            </Modal>
        </>
    )
}

export default ProfileModal;



