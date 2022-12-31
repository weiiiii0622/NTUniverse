import React, { useState, useEffect } from 'react';
import { 
    Form,
    Input,
    Button,
    Modal, 
    Row,
    Col,
    Image,
    Avatar,
    Card,
    List,
    Space,
    message 
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
    HeartOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

import { useMyContext } from '../../Utils/useMyContext';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

const StyledCard = styled(Card)`
  .ant-card-head-title {
    padding: 0;
    padding-top: 4px;
  }
`;

const StyledModal = styled(Modal)`
//   .ant-modal-content {
//     background-color: #EDEDE9;
//   }
//   .ant-modal-header {
//     background-color: #EDEDE9;
//   }

`;


const BulletinModal = () => {
    const { bulletinModalOpen, setBulletinModalOpen, me } = useMyContext();
    const [ pageInfo, setPageInfo ] = useState({page:0, size:4});
    const [ loading, setLoading ] = useState(false);
    const [ bulletinMessages, setBulletinMessages ] = useState<Object[]>([{usr:"wei", msg:"Good"}, {usr:"xia", msg:"Good"}, {usr:"kc", msg:"Good"}, {usr:"33", msg:"Good"}, {usr:"wchin", msg:"Good"}, {usr:"frog", msg:"Good"}]);


    const [form] = Form.useForm();

    
    useEffect(() => {
        form.setFieldsValue({
            nick_name: me['nick_name'],
            description: me['description'],
        });
    }, [me])

    const onFinish = async () => {
        setLoading(true);
        // let user = await updateUser({
        //     variables:{
        //         email: me['email'],
        //         nick_name: form.getFieldValue('nick_name'),
        //         picture: me['picture'],
        //         description: form.getFieldValue('description'),
        //     }
        // })
        // console.log(user);

        setTimeout(() => {
            form.resetFields();
            message.success('留言成功！');
            setLoading(false);
        }, 1000);
    };

    const onFinishFailed = (e) => {
        message.error('留言失敗！');
    };


    const handleSave =  async () => {
        //console.log(form.getFieldValue('nick_name'));
        form.submit()
    };


    return (
        <>
            <StyledModal
                title="留言板 🪧"
                centered
                open={bulletinModalOpen}
                
                //onOk={handleOk}
                onCancel={() => {
                    form.resetFields();
                    setBulletinModalOpen(false);
                }}
                width={"50vw"}
                style={{
                    backgroundColor: 'black',
                }}
                bodyStyle={{
                    
                    overflow: 'auto',
                    height: '70vh',
                    padding: 'inherit',
                    paddingTop: '0',
                    
                }}
                footer={[
                    <Button  key="submit" type="primary" loading={loading} onClick={handleSave}>
                      Save
                    </Button>
                ]}
            >

            
            <>
                <Card
                    bodyStyle={{
                        height: '55vh',
                        overflow: 'auto',
                        paddingTop: '0',
                        marginBottom: '1vh',
                        //backgroundColor: "#EDEDE9",
                    }}
                    bordered={false}
                >
                    <List
                        itemLayout = 'vertical'
                        size = 'small'
                        bordered={false}
                        style = {{

                        }}
                        pagination={{
                            onChange: (page, pageSize) => {
                                setPageInfo({
                                    page: page-1,
                                    size: pageSize,
                                })
                                console.log(`BulletinPage: ${pageSize}`);
                            },
                            pageSize: 4,
                            position: 'top'
                        }}
                        dataSource={bulletinMessages}

                        renderItem = { (msg: any, idx) => (
                            <List.Item
                                key={idx}
                                actions={[]}
                            >   
                                
                                <StyledCard
                                    hoverable = {true}
                                    bordered = {false}
                                    title={<>
                                        <Row gutter={0} align='top' style={{alignItems: 'center',}}>
                                            <Col flex={1}>
                                                <Avatar 
                                                    src="https://joeschmoe.io/api/v1/random" 
                                                    style={{
                                                        height: '2.7vh',
                                                        width: '2.7vh',
                                                    }}
                                                /> 
                                            </Col>
                                            <Col flex={39}>
                                                B{idx+pageInfo['page']*pageInfo['size']}- 
                                                <a 
                                                    onClick={(e)=>console.log(msg.usr)}
                                                >
                                                     {msg.usr}
                                                </a>
                                            </Col>
                                            <Col flex={1}>
                                                <Button style={{borderColor: 'transparent', backgroundColor: 'transparent'}} icon={<HeartOutlined />} />
                                            </Col>
                                        </Row>

                                    </>}

                                    style={{
                                        //margin: 16
                                    }}
                                    headStyle={{
                                        fontSize: 'small',
                                        backgroundColor: '#e9ecef',
                                    }}
                                    bodyStyle={{
                                        backgroundColor: '#ced4da'
                                    }}
                                    actions={[

                                    ]}
                                >
                                    {msg.msg}
                                </StyledCard>

                            </List.Item>
                        )}
                    />
                </Card>
            </>


            <>
                <Form
                    form={form}
                    wrapperCol={{ span: 20, offset:0}}
                    style={{
                        padding: 'inherit',
                        height: '10vh',
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item 
                        name="HashTag" 
                        label="HashTag"  
                        wrapperCol={{span:10}} 
                        style={{marginBottom: '1vh',}}
                    >
                        <Input placeholder={"輸入你想要的標籤"}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="想留的話"
                        style={{marginBottom: '1vh',}}
                        rules={[{ type: 'string', min: 1 }]}
                    >
                        <Input.TextArea rows={1} autoSize={{ minRows: 1 }} showCount maxLength={50}  placeholder="你還沒留下任何訊息"/>
                    </Form.Item>
                </Form>
            </>
                                    
            </StyledModal>
        </>
    )
}

export default BulletinModal;



