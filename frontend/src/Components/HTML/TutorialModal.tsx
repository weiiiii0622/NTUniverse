import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useMyContext } from '../../Utils/useMyContext';

const TutorialModal = () => {
    const { tutorialModalOpen, setTutorialModalOpen } = useMyContext();


    return (
        <>
            <Modal
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
                
            </Modal>
        </>
    )
}

export default TutorialModal;