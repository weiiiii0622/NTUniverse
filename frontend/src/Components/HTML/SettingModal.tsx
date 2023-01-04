import './../../index.css'
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
    Card,
    Layout,
    Slider
} from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';
import { USERALL_QUERY } from '../../Utils/graphql';
import styled from 'styled-components';
import useBikeContext from '../../Containers/hooks/useBikeContext';
import { SetStateType } from '../../Utils/type';

interface MySliderProps {
    max: number,
    min: number,
    title: string,
    emojiLeft: string,
    emojiRight: string,
    val: number,
    setVal: SetStateType<number>,
}

const MySlider = ({ max, min, title, emojiLeft, emojiRight, val, setVal}:MySliderProps) => {
    
    return (
      <div className="icon-wrapper">
        <Row
            style={{
                height: '5vh',
                fontWeight: 900,
                backgroundColor: '#e9ecef'
            }}
        >
            #{title}
        </Row>
        <Row gutter={10}>
            <Col span={2} style={{fontSize: '2em', marginLeft: '0'}}> {emojiLeft}</Col> 
            <Col style={{display: 'flex', alignItems: 'center'}} span={20}><Slider max={max} min={min} style={{width: '100%'}} onChange={setVal} value={val} /></Col>
            <Col span={2} style={{fontSize: '2em'}}> {emojiRight} </Col>

        </Row>
      </div>
    );
};

const SettingModal = () => {
    const { settingModalOpen, setSettingModalOpen } = useMyContext();
    const { setBikeEnabled } = useBikeContext();
    const [isLoading, setIsLoading] = useState(false);

    const [bikeSpeedValue, setBikeSpeedValue] = useState(50);
    const [volumeValue, setVolumeValue] = useState(50);

    return (
        <>
            <Modal
                title={<>設定 <SettingOutlined /></>}
                centered
                open={settingModalOpen}
                //onOk={handleOk}
                onCancel={() => { setSettingModalOpen(false); setBikeEnabled(true); }}
                width={"50vw"}
                zIndex={100}
                bodyStyle={{
                    overflow: 'auto',
                    height: '70vh',
                    padding: 'inherit'
                }}
                footer={[
                    // <Button key="submit" type="primary" loading={isLoading} onClick={()=>{}}>
                    //   Save
                    // </Button>,
                    <Layout.Footer  style={{ textAlign: 'center' }}>NTUniverse © 2022</Layout.Footer>
                ]}
            >

                <>  
                    {/* 速度 */}
                    <Row gutter={5} style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <Card
                                hoverable={true}
                                bordered={false}
                                style={{
                                    height: '100%',
                                    backgroundColor: '#e9ecef'

                                }}
                            >   
                                
                                <MySlider 
                                    max={100} 
                                    min={0}
                                    title={"速度"}
                                    emojiLeft={"🐢"}
                                    emojiRight={"🏎️"}
                                    val={bikeSpeedValue}
                                    setVal={setBikeSpeedValue}
                                />
                            </Card>
                        </Col>
                    </Row>
                    {/* 音量 */}
                    <Row gutter={5} style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <Card
                                hoverable={true}
                                bordered={false}
                                style={{
                                    height: '100%',
                                    backgroundColor: '#e9ecef'

                                }}
                            >   
                                <MySlider 
                                    max={100} 
                                    min={0}
                                    title={"音量"}
                                    emojiLeft={"🔈"}
                                    emojiRight={"🔊"}
                                    val={volumeValue}
                                    setVal={setVolumeValue}
                                />
                            </Card>
                        </Col>
                    </Row>

                </>
            </Modal>
        </>
    )
}

export default SettingModal;



