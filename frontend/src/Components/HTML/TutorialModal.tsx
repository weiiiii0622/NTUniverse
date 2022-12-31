import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
import { Tour } from 'antd';
import type { TourProps } from 'antd';
import { useMyContext } from '../../Utils/useMyContext';

const TutorialModal: React.FC = () => {
    const { tutorialModalOpen, setTutorialModalOpen, setBikeEnabled } = useMyContext();

    const steps: TourProps['steps'] = [
        {
          title: null,
          cover: (
            <h1> Welcome to NTUniverse </h1>
          ),
        },
        {
            title: null,
            cover: (
                <>
                    <h2 style={{}}>登入 Google</h2>
                    <p>登入 Google 帳戶來獲得完整體驗</p>
                </>
            )
          //   target: () => ref1.current,
        },
        {
            title: null,
            cover: (
                <>
                    <h2 style={{}}>腳踏車🚲～</h2>
                    <p>利用 WSAD 來控制腳踏車</p>
                </>
            )
          //   target: () => ref1.current,
        },
        {
            title: null,
                cover: (
                    <>
                        <h2>聊天室</h2>
                        <p>在這裡與你的朋友們聊天</p>
                    </>
                )
        //   target: () => ref3.current,
        },
        {
            title: null,
                cover: (
                    <>
                        <h2>公告欄</h2>
                        <p>在各個景點放置公告來跟大家交流！</p>
                    </>
                )
        //   target: () => ref3.current,
        },
        {
            title: null,
                cover: (
                    <>
                        <h2>小遊戲</h2>
                        <p>在校園到處逛逛，發掘各種有趣的小遊戲吧！</p>
                    </>
                )
        //   target: () => ref3.current,
        },
        {
            title: null,
                cover: (
                    <>
                        <h2>Let's GO!</h2>
                        <p>騎上腳踏車，開始你的冒險！</p>
                    </>
                )
        //   target: () => ref3.current,
        },
      ];

    return (
        <>
            {/* <Modal
                title="This is a tutorial......"
                centered
                open={tutorialModalOpen}
                onOk={() => setTutorialModalOpen(false)}
                //onCancel={() => setTutorialModalOpen(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={() => setTutorialModalOpen(false)}>
                      Ok
                    </Button>,
                ]}
            >
                <p>Press W S A D to control the bike.</p>
                <p> hello tutorial </p>
                
            </Modal> */}
             <Tour open={tutorialModalOpen} onClose={() => {setBikeEnabled(true); setTutorialModalOpen(false)}} steps={steps}></Tour>
        </>
    )
}

export default TutorialModal;

