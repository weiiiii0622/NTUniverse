import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import {
    LoadingOutlined
} from '@ant-design/icons';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

import { useMyContext } from '../../Utils/useMyContext';
import { CREATE_USER_MUTATION } from '../../graphql/mutation';




const LoginModal = () => {
    const { loginModalOpen, setLoginModalOpen, isLogin, setIsLogin, login } = useMyContext();
    const [ loading, setLoading ] = useState(false);

    const clientId = '400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com';

    const onSuccess = async (res) => {
        //console.log('success:', res);
        const info = jwt_decode(res.credential);
        console.log(info);
        setLoading(true);
        let user = await login({
            variables:{
                email: info['email'],
                first_name: info['given_name'],
                last_name: info['family_name'],
                picture: info['picture'],
            }
        })
        console.log(user);
        await handleLoading(user.data.createUser);
        
    };


    const handleLoading =  async ( { first_name } ) => {
        //setModalText('The modal will be closed after two seconds');
        setLoading(true);
        setTimeout(() => {
          setLoginModalOpen(false);
          setLoading(false);
          setIsLogin(true);
          alert(`歡迎回來 ${first_name}`);
        }, 1000);
    };

    return (
        <>
            <Modal
                title="Login"
                centered
                open={loginModalOpen}
                //onOk={handleOk}
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
                {
                    loading 
                    ?
                        <LoadingOutlined />
                    :
                        <GoogleLogin
                            useOneTap={false}
                            cancel_on_tap_outside={false}
                            locale={"zh-TW"}
                            onSuccess={onSuccess}
                            onError={() => {
                                alert('登入失敗 請稍後再試');
                            }}
                        />
                }                
                                    
            </Modal>
        </>
    )
}

export default LoginModal;



