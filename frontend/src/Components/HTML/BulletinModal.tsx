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
    Divider,
    Space,
    Tag,
    message 
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
    HeartOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

import MyTag from './components/Tag';
import PlsLogin from './components/PleaseLogIn';
import { useMyContext } from '../../Utils/useMyContext';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

const StyledCard = styled(Card)`
  .ant-card-head-title {
    padding: 0;
    padding-top: 4px;
  }
  .ant-card-body {
    padding-top: 16px;
    padding-bottom: 8px;
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

const StyledDivider = styled(Divider)`
  .ant-divider-horizontal {
    margin-top: 24px;
    margin-bottom: 6px;
  }
`;


const BulletinModal = () => {
    const { bulletinModalOpen, setBulletinModalOpen, setBikeEnabled, me, isLogin } = useMyContext();
    const [ pageInfo, setPageInfo ] = useState({page:0, size:4});
    const [ loading, setLoading ] = useState(false);
    const [ canSubmit, setCanSubmit ] = useState(false);

    const [ bulletinMessages, setBulletinMessages ] = useState<Object[]>([{usr:"wei", msg:"嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨", tag:["做愛", "Hii", "HELLO"]}, {usr:"xia", msg:"Good", tag:["做愛", "Hii", "HELLO"]}, {usr:"kc", msg:"Good", tag:["做愛", "Hii", "HELLO"]}, {usr:"33", msg:"Good", tag:["做愛", "Hii", "HELLO"]}, {usr:"wchin", msg:"Good", tag:["做愛", "Hii", "HELLO"]}, {usr:"frog", msg:"Good", tag:["做愛", "Hii", "HELLO"]}]);
    const [ NewMsg, setNewMsg ] = useState<{value: string; validateStatus?: ValidateStatus; errorMsg?: string | null;}>({value: "", validateStatus: "", errorMsg: null});



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

    const validateNewMsg = (value: string): {
        validateStatus: ValidateStatus;
        errorMsg: string | null;
    } => {
    if (value.length > 0 && value[0]!=' ') {
        setCanSubmit(true);
        return {
        validateStatus: 'success',
        errorMsg: null,
        };
    }
    else{
        setCanSubmit(false);
        return {
            validateStatus: 'error',
            errorMsg: '留言不可為空！',
        };
    }
};

    const onNewMsgChange = (e) => {
        setNewMsg({
            ...validateNewMsg(e.target.value),
            value: e.target.value
        })
    }

    return (
        <>
            <StyledModal
                title="留言板 🪧"
                centered
                open={bulletinModalOpen}
                
                //onOk={handleOk}
                onCancel={() => {
                    form.resetFields();
                    setBikeEnabled(true);
                    setBulletinModalOpen(false);
                }}
                width={"50vw"}
                style={{
                    backgroundColor: 'black',
                }}
                bodyStyle={{
                    
                    overflow: 'auto',
                    height: '75vh',
                    padding: 'inherit',
                    paddingTop: '0',
                    
                }}
                footer={[
                    <Button disabled={canSubmit===false} key="submit" type="primary" loading={loading} onClick={handleSave}>
                      Save
                    </Button>
                ]}
            >
            {
                isLogin
                ?
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
                            pageSize: 3,
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
                                                B{1+idx+pageInfo['page']*pageInfo['size']}- 
                                                <a 
                                                    onClick={(e)=>{
                                                        console.log(msg.usr)
                                                    }}
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
                                    <Divider style={{marginTop: "24px", marginBottom: "6px"}}/>
                                    {
                                        msg.tag.map((tag, idx) => {
                                            return (
                                                <Tag color="#6c757d">#{tag}</Tag>
                                            )
                                        })
                                    }
                                </StyledCard>

                            </List.Item>
                        )}
                    />
                </Card>

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
                        <MyTag />
                        {/* <Input placeholder={"輸入你想要的標籤"}/> */}
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="想留的話"
                        style={{marginBottom: '1vh',}}
                        rules={[{ type: 'string', min: 1 }]}
                        validateStatus={NewMsg.validateStatus} 
                        help={NewMsg.errorMsg || ""}
                    >
                        <Input.TextArea 
                            rows={1} 
                            autoSize={{ maxRows: 1 }} 
                            showCount maxLength={50}  
                            placeholder="你還沒留下任何訊息"
                            onChange={onNewMsgChange}
                        />
                    </Form.Item>
                </Form>
                </>

                :

                <> 
                <PlsLogin />
                </>
            }
            </StyledModal>
        </>
    )
}

export default BulletinModal;