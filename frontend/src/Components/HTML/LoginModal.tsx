import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import {
    LoadingOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

import { useMyContext } from '../../Utils/useMyContext';
import useQueryChat from '../../Containers/HTML/ChatRoom/hooks/useQueryChat';




const LoginModal = () => {
    const { loginModalOpen, setLoginModalOpen, setBikeEnabled, isLogin, setIsLogin, login, me, setMe, setProfileUser } = useMyContext();
    const [ loading, setLoading ] = useState(false);

    const clientId = '400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com';

    const onSuccess = async (res) => {
        //console.log('success:', res);
        const info = jwt_decode(res.credential);
        //console.log(info);
        setLoading(true);
        let user = await login({
            variables:{
                email: info['email'],
                first_name: info['given_name'],
                last_name: info['family_name'],
                nick_name: info['given_name'],
                picture: info['picture'],
            }
        })
        //console.log(user);
        await handleLoading(user.data.createUser);
    };


    const handleLoading =  async ( { id, first_name, last_name, nick_name, email, picture, description } ) => {
        //setModalText('The modal will be closed after two seconds');
        setMe({
            id,
            first_name,
            last_name,
            nick_name, 
            email, 
            picture, 
            description
        })
        setProfileUser(id);
        setLoading(true);
        setTimeout(() => {
            // things after login
          setLoginModalOpen(false);
          setLoading(false);
          setIsLogin(true);
          setBikeEnabled(true);
          useQueryChat({ chatRoomName: 'World Channel'})
          console.log('099999');
          
          message.success(`歡迎回來 ${nick_name}`);
        }, 1000);
    };

    return (
        <>
            <Modal
                title={<>登入 <LoginOutlined /></>}
                centered
                open={loginModalOpen}
                onCancel={() => { setBikeEnabled(true); setLoginModalOpen(false);}}
                bodyStyle={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
                footer={[]}
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
                                message.error('登入失敗 請稍後再試');
                            }}
                        />
                }                
                                    
            </Modal>
        </>
    )
}

export default LoginModal;



