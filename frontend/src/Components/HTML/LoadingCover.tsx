import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSpringRef } from '@react-spring/web'
import { 
    Button, 
    Modal, 
    message, 
    Card,
    Row,
    Col 
} from 'antd';
import {
    LoadingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';




const LoadingCover = () => {

    const { isChangingScene, setIsChangeScene, isLoading } = useMyContext();
    const [loadFinished, setLoadFinished] = useState(false);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        if(isLoading===false){
            return null;
        }
    }, [isLoading])
  
    return (
        <animated.div 
            style={{
                
                //display: 'flex',
                position: 'absolute',
                backgroundColor: 'brown',
                width: '100%',
                height: '100%',
                zIndex: '100',
                // justifyContent: 'center',
                // alignItems: 'center',
                //backgroundImage: `url(/pics/loading_cover.PNG)`
            }}
        >
            <Row justify={'center'}>
                <Card 
                    hoverable={true}
                    style={{ 
                        height: '6vw',
                        width: '20vw',
                        display: 'flex',
                        justifyContent: 'center', 
                        
                    }}
                    bodyStyle={{
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    進入
                </Card>
            </Row>
            <Row ></Row>
            <Row justify={'center'}>

                <Card 
                    hoverable={true}
                    style={{ 
                        height: '6vw',
                        width: '20vw',
                        display: 'flex',
                        justifyContent: 'center', 
                        
                    }}
                    bodyStyle={{
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    進入
                </Card>
            </Row>
            
            {/* <Button 
                //type="dashed" 
                type="default" 
                style={{
                    width: '20vw',
                    height: '6vh',
                    backgroundColor: 'transparent',
                    color: 'white',
                }}
            >
                進入
            </Button> */}
        </animated.div>)
  }

export default LoadingCover;



