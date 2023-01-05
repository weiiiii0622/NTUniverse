import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
import { Tour, Image } from 'antd';
import type { TourProps } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useMyContext } from '../../Utils/useMyContext';
import useBikeContext from '../../Containers/hooks/useBikeContext';

const TutorialModal: React.FC = () => {
  const { tutorialModalOpen, setTutorialModalOpen } = useMyContext();
  const { setBikeEnabled } = useBikeContext();

  const steps: TourProps['steps'] = [
    {
      title: null,
      cover: (
        <h1> Welcome to NTUniverse </h1>
      ),
      nextButtonProps: { children: '下一步' },
    },
    {
      title: null,
      cover: (
        <>
          <LoginOutlined style={{ fontSize: '20px' }}/><h2 style={{ display: 'inline', marginLeft: '5px' }}>登入 Google</h2>
          <p>登入帳戶來獲得完整體驗</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_bike.gif' />
          <h2>腳踏車🚲～</h2>
          <p>利用 WSAD 來控制腳踏車</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_chat.png' />
          <h2>聊天室</h2>
          <p>與朋友加入同一個聊天室盡情暢談</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_bulletin.gif' />
          <h2>留言板</h2>
          <p>在各個景點留言來跟大家交流！</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_game.gif' />
          <h2>小遊戲</h2>
          <p>在校園到處逛逛，發掘各種有趣的小遊戲吧！</p>
        </>
      ),
      nextButtonProps: { children: '下一步' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
    {
      title: null,
      cover: (
        <>
          <Image style={{ borderRadius: '6px' }} preview={false} height={300} width={480} src='/pics/tutorial_start.png' />
          <h2>Let's GO!</h2>
          <p>騎上腳踏車，開始你的冒險！</p>
        </>
      ),
      nextButtonProps: { children: '完成' },
      prevButtonProps: { children: '上一步' },
      //   target: () => ref3.current,
    },
  ];

  return (
    <>
      <Tour
        open={tutorialModalOpen} 
        onClose={() => { setBikeEnabled(true); setTutorialModalOpen(false) }} 
        steps={steps}
      />
    </>
  )
}

export default TutorialModal;

