import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSpringRef } from '@react-spring/web'
import { Button, Modal, message } from 'antd';
import {
    LoadingOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';




const LoadingCover = () => {

    const { isChangingScene, setIsChangeScene, isLoading } = useMyContext();

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
    }, [isLoading])
  
    return (
        <animated.div 
            style={{
                
                display: 'block',
                position: 'absolute',
                backgroundColor: 'brown',
                width: '100%',
                height: '100%',
                zIndex: '100',
            }}
        >
            
        </animated.div>)
  }

export default LoadingCover;



