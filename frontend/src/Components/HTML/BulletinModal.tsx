import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
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
    HeartOutlined,
    HeartFilled,
} from '@ant-design/icons';
import styled from 'styled-components';

import { BULLETIN_QUERY } from '../../graphql';

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
    const { bulletinModalOpen, setBulletinModalOpen, setBikeEnabled, me, isLogin, location, setLocation, bulletinMessages, leaveComment, likeComment } = useMyContext();
    const [ pageInfo, setPageInfo ] = useState({page:0, size:4});
    const [ load, setLoad ] = useState(false);
    const [ canSubmit, setCanSubmit ] = useState(false);

    const [ tags, setTags] = useState<string[]>([]);
    const [ NewMsg, setNewMsg ] = useState<{value: string; validateStatus?: ValidateStatus; errorMsg?: string | null;}>({value: "", validateStatus: "", errorMsg: null});

    const [form] = Form.useForm();

    
    // useEffect(() => {
    //     form.setFieldsValue({
    //         // nick_name: me['nick_name'],
    //         // description: me['description'],
    //     });
    // }, [me])

    const onFinish = async () => {
        setLoad(true);
        let newMsg = await leaveComment({
            variables:{
                location: location,
                author: me['id'],
                body: form.getFieldValue('body'),
                tags: tags,
            }
        })
        //console.log(newMsg);

        setTimeout(() => {
            form.resetFields();
            setTags([]);
            setLoad(false);
            setCanSubmit(false);
            message.success('留言成功！');
        }, 10);
    };

    const onFinishFailed = (e) => {
        message.error('留言失敗！');
    };


    const handleSave =  async () => {
        //console.log(tags);
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

    const checkIsLiked = (idx) => {
        if(bulletinMessages[idx].likers.findIndex((liker:any) => {return liker.id===me['id']}) === -1){
            return false;
        }
        else{
            return true;
        }
    }

    const handleIsLiked = async (idx, isLiked) => {
        let newMsg = await likeComment({
            variables:{
                location: location,
                id: bulletinMessages[idx].id,
                email: me['email'],
                isLiked: isLiked,
            }
        })
        console.log(newMsg);

        setTimeout(() => {
            if(isLiked) message.success('按讚成功！');
        }, 10);
    }

    return (
        <>
            <StyledModal
                title={`${location}的留言板 🪧`}
                centered
                open={bulletinModalOpen}
                //onOk={handleOk}
                onCancel={() => {
                    form.resetFields();
                    setTags([]);
                    setLocation("");
                    setBikeEnabled(true);
                    setCanSubmit(false);
                    setLoad(false);
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
                    <Button disabled={canSubmit===false} key="submit" type="primary" loading={load} onClick={handleSave}>
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
                                //console.log(`BulletinPage: ${pageSize}`);
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
                                                    src={`${msg['author'].picture}`}
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
                                                        console.log(msg['author'].nick_name)
                                                    }}
                                                >
                                                    {msg['author'].nick_name}
                                                </a>
                                            </Col>
                                            <Col flex={0}>
                                                {msg['likers'].length}
                                            </Col>
                                            <Col flex={1}>
                                                {
                                                    checkIsLiked(idx)
                                                    ?
                                                    <Button 
                                                        style={{borderColor: 'transparent', backgroundColor: 'transparent'}} 
                                                        icon={<HeartFilled style={{color: "red",}}/>} 
                                                        onClick={() => handleIsLiked(idx, false)}
                                                    />
                                                    :
                                                    <Button 
                                                        style={{borderColor: 'transparent', backgroundColor: 'transparent'}} 
                                                        icon={<HeartOutlined />} 
                                                        onClick={() => handleIsLiked(idx, true)}
                                                    />

                                                }
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
                                    {msg.body}
                                    <Divider style={{marginTop: "24px", marginBottom: "6px"}}/>
                                    {
                                        msg.tags.length>0 
                                        ? 
                                            msg.tags.map((tag, idx) => {
                                                return (
                                                    <Tag color="#6c757d">#{tag}</Tag>
                                                )
                                            })
                                        :
                                        null
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
                        <MyTag tags={tags} setTags={setTags} />
                        {/* <Input placeholder={"輸入你想要的標籤"}/> */}
                    </Form.Item>

                    <Form.Item
                        name="body"
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