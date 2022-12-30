import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

import { useMyContext } from '../../Utils/useMyContext';




const LoginModal = () => {
    const { loginModalOpen, setLoginModalOpen, isLogin, setIsLogin } = useMyContext();
    const [ loading, setLoading ] = useState(false);

    const clientId = '400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com';

    const onSuccess = async (res) => {
        //console.log('success:', res);
        const info = jwt_decode(res.credential);
        console.log(info);
        setIsLogin(true);
        handleOk();
        alert(`歡迎回來 ${info['given_name']}`);
    };


    const handleOk =  async () => {
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
                bodyStyle={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
                footer={[
                    // <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    //   Submit
                    // </Button>,
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
                <GoogleLogin
                    useOneTap={false}
                    cancel_on_tap_outside={false}
                    locale={"zh-TW"}
                    onSuccess={onSuccess}
                    onError={() => {
                        alert('登入失敗 請稍後再試');
                    }}
                />
                                    
            </Modal>
        </>
    )
}

export default LoginModal;



