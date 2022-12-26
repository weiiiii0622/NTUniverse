import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useMyContext } from '../Utils/useMyContext';

const TutorialModal = () => {
    const { tutorialModalOpen, setTutorialModalOpen} = useMyContext();


  return (
      <>
          <Modal
              title="Vertically centered modal dialog"
              centered
              open={tutorialModalOpen}
              onOk={() => setTutorialModalOpen(false)}
              onCancel={() => setTutorialModalOpen(false)}
          >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
          </Modal>     
      </>
  )
}

export default TutorialModal;