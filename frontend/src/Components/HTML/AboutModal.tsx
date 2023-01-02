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
    Statistic,
    message, 
    Card
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
    LikeOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import countapi from 'countapi-js';

import { useMyContext } from '../../Utils/useMyContext';
import { USERALL_QUERY } from '../../graphql';


const AboutModal = () => {
    const { aboutModalOpen, setAboutModalOpen, setBikeEnabled, updateUser, me, setMe, profileUser, setProfileUser } = useMyContext();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMe, setIsMe ] = useState(false);
    const [ form ] = Form.useForm();

    const deadline =  new Date(2023, 1, 20, 0);
    let usr_cnt = "N/A";

    const { loading, error, data, refetch } = useQuery(USERALL_QUERY, {

    })

    countapi.visits('locatlhost').then((result) => {
        console.log(result);
    });

    useEffect(() => {
        console.log("USERALL data")
        console.log(data);
    }, [data])

    const onFinish = async () => {
        // setIsLoading(true);
        // let user = await updateUser({
        //     variables:{
        //         email: me['email'],
        //         nick_name: form.getFieldValue('nick_name'),
        //         picture: me['picture'],
        //         description: form.getFieldValue('description'),
        //     }
        // })
        // refetch({
        //     id: profileUser,
        // })
        // //console.log(user);
        // setMe({
        //     id: user.data.updateUser['id'],
        //     first_name: user.data.updateUser['first_name'],
        //     last_name: user.data.updateUser['last_name'],
        //     nick_name: user.data.updateUser['nick_name'], 
        //     email: user.data.updateUser['email'], 
        //     picture: user.data.updateUser['picture'], 
        //     description: user.data.updateUser['description']
        // })
        // setTimeout(() => {
        //     message.success('更新個人資料成功！');
        //     //console.log(me);
        //     //setProfileModalOpen(false);
        //     setIsLoading(false);
        //     //setBikeEnabled(true);
        // }, 1000);
    };

    if(loading) return null;
    usr_cnt = data['userAll'].length;

    return (
        <>
            <Modal
                title={<>關於 <InfoCircleOutlined/></>}
                centered
                open={aboutModalOpen}
                //onOk={handleOk}
                onCancel={() => {  setAboutModalOpen(false); setBikeEnabled(true);}}
                width={"50vw"}
                zIndex={100}
                bodyStyle={{
                    overflow: 'auto',
                    height: '70vh',
                    padding: 'inherit'
                }}
                footer={[
                    // <Button disabled={canSubmit===false || isMe===false} key="submit" type="primary" loading={isLoading} onClick={handleSave}>
                    //   Save
                    // </Button>,
                ]}
            >

            <>
                <Row>
                    <Col span={16}>
                        <Card
                            hoverable = {true}
                            bordered = {false}
                        >
                            <Statistic.Countdown 
                                title="距離開學還有..." 
                                value={deadline} 
                                format="D 天 H 時 m 分 s 秒"
                                prefix={<><ClockCircleOutlined /> </>}
                            />

                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable = {true}
                            bordered = {false}
                        >
                            <Statistic 
                                title="累積使用者" 
                                value={usr_cnt} 
                                prefix={<TeamOutlined />} 
                            />
                        </Card>
                    </Col>
                </Row>
            
            </>

            </Modal>
        </>
    )
}

export default AboutModal;



