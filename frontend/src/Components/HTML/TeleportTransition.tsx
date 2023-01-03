import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSpringRef } from '@react-spring/web'
import { Button, Modal, message } from 'antd';
import {
    LoadingOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { useMyContext } from '../../Utils/useMyContext';




const TeleportTransition = () => {

    const { isChangingScene, setIsChangeScene } = useMyContext();

    useEffect(() => {

        if(isChangingScene){
            api.start();
            setIsChangeScene(false);
        }

    }, [isChangingScene])

    const api = useSpringRef();
    const props = useSpring({
      ref: api,
      from: { 
        opacity: 0,
        backgroundColor: 'transparent',
       // display: 'none', 
      },
      to: async(next, cancel) => {
        //await next({ opacity: 0, display: 'none', })
        await next({ opacity: 1, display: 'block', backgroundColor: 'black',})
        await next({ opacity: 0, })
        await next({ display: 'none', })
      },
      config: {
        tension: 250,
        friction: 18,
        mass: 3,
        clamp: true,
        duration: 1000,
      },
    })
  
    return (
        <animated.div 
            style={{
                mixBlendMode: 'multiply',
                display: ' none',
                position: 'absolute',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                ...props,
            }}
        >
            
        </animated.div>)
  }

export default TeleportTransition;



