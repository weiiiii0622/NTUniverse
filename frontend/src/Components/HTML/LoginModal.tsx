import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useMyContext } from '../../Utils/useMyContext';

const LoginModal = () => {
    const { loginModalOpen, setLoginModalOpen } = useMyContext();
    const [ loading, setLoading ] = useState(false);

    const handleOk = () => {
        //setModalText('The modal will be closed after two seconds');
        setLoading(true);
        setTimeout(() => {
          setLoginModalOpen(false);
          setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Modal
                title="Login"
                centered
                open={loginModalOpen}
                onOk={handleOk}
                onCancel={() => setLoginModalOpen(false)}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                      Submit
                    </Button>,
                    // <Button
                    //   key="link"
                    //   href="https://google.com"
                    //   type="primary"
                    //   loading={loading}
                    //   onClick={handleOk}
                    // >
                    //   Search on Google
                    // </Button>,
                ]}
            >
                <p>Login</p>
                
            </Modal>
        </>
    )
}

export default LoginModal;