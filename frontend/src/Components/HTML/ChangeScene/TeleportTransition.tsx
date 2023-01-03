import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSpringRef } from '@react-spring/web'
import { Button, Modal, message } from 'antd';
import {
    LoadingOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { useMyContext } from '../../../Utils/useMyContext';
import { calcPosFromAngles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';




const TeleportTransition = ({ scene }) => {

    const { isChangingScene, setIsChangeScene, finish, setFinish } = useMyContext();
    let started = false;

     useEffect(() => {
      //console.log(isChangingScene);
      //console.log(`finish: ${finish}`);
      if(!finish && !started){
        started = true;
        //console.log("Start Change Scene!")
        apiBack.start();
        apiText.start();
        apiTop.start();
        apiBot.start();
      }
    }, [finish])

    const apiBack = useSpringRef();
    const apiText = useSpringRef();
    const apiTop = useSpringRef();
    const apiBot = useSpringRef();
    const { opacity } = useSpring({
      ref: apiBack,
      from: {
        opacity: 0,
      },
      to: [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      config: {
        tension: 280,
        friction: 60,
        duration: 1800,
      },
      delay: 150,
      onRest: () => {
        //console.log("BackEnded")
      }
    });
  
    const springText = useSpring({
      ref: apiText,
      from: {
        left: '100%',
        opacity: 0,
        backdropFilter: 'blur(5px)',
      },
      to: [
        {
          left: '45%',
          opacity: 1,
          backdropFilter: 'blur(5px)',
        },
        {
          left: '-15%',
          opacity: 0,
          backdropFilter: 'blur(0px)',
        }
      ],
      config: {
        tension: 280,
        friction: 80,
        //duration: 1200,
      },
      delay: 150,
      onRest: () => {
        //console.log("TextEnded")
        started = false;
      }
    });
  
    const springTop = useSpring({
      ref: apiTop,
      from: {
        width: 600,
        left: '100%',
        opacity: 0,
      },
      to: [
        {
          width: 250,
          left: '42.5%',
          opacity: 1,
        },
        {
          width: 600,
          left: '-15%',
          opacity: 0,
        }
      ],
      config: {
        tension: 280,
        friction: 80,
        //duration: 1200,
      },
      delay: 150,
      onRest: () => {
        //console.log("TopEnded")
      }
    });
  
  
    const springBot = useSpring({
      ref: apiBot,
      from: {
        width: 600,
        right: '100%',
        opacity: 0,
      },
      to: [
        {
          width: 250,
          right: '46.5%',
          opacity: 1,
        },
        {
          width: 600,
          right: '-15%',
          opacity: 0,
        }
      ],
      config: {
        tension: 280,
        friction: 80,
        //duration: 1200,
      },
      delay: 150,
      onRest: () => {
        //console.log("BotEnded")
        setFinish(true);
      }
    });
  
    return <>
      <animated.div style={{
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: '100',
        fontFamily: 'burnfont-italic',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: '40px',
        //backdropFilter: 'blur(5px)',
      }}>
        <animated.div style={{
          width: '100%',
          height: "100%",
          backgroundColor: '#000000',
          opacity,
          position: 'relative',
        }}
        >
        </animated.div>
        <animated.div style={{
          color: '#f3eddd',
          position: 'absolute',
          borderTop: '4px #f3eddd solid',
          top: '25%',
          ...springTop
        }} />
        <animated.div
          style={{
            color: '#f3eddd',
            position: 'absolute',
            top: '30%',
            ...springText,
          }}
        >
          {`${isChangingScene['scene']}`}
        </animated.div>
        <animated.div style={{
          color: '#f3eddd',
          position: 'absolute',
          borderTop: '4px #f3eddd solid',
          top: '40%',
          ...springBot,
        }} />
      </animated.div>
    </>
  }

export default TeleportTransition;



