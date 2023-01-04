import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import {
    LoadingOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

import { useMyContext } from '../../Utils/useMyContext';
import useBikeContext from '../../Containers/hooks/useBikeContext';




const LogoutModal = () => {
    const { logoutModalOpen, setLogoutModalOpen, isLogin, setIsLogin, me, setMe } = useMyContext();
    const { setBikeEnabled } = useBikeContext();
    const [ loading, setLoading ] = useState(false);


    const handleLogout =  async ( nick_name: string ) => {
        //setModalText('The modal will be closed after two seconds');
        setMe({
            id: "",
            first_name: "",
            last_name: "",
            nick_name: "", 
            email: "", 
            picture: "", 
            description: "",
        })
        setLoading(true);
        setTimeout(() => {
          setLogoutModalOpen(false);
          setLoading(false);
          setIsLogin(false);
          setBikeEnabled(true);
          message.success(`下次再見！ ${nick_name}`);
        }, 500);
    };

    return (
        <>
            <Modal
                title={<>登出 <LogoutOutlined /></>}
                centered
                open={logoutModalOpen}
                //onOk={() => handleLogout(me['nick_name'])}
                onCancel={() => {setBikeEnabled(true);setLogoutModalOpen(false)}}
                bodyStyle={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
                footer={[
                    <Button key="back" onClick={() => {setBikeEnabled(true); setLogoutModalOpen(false)}}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => handleLogout(me['nick_name'])}>
                        登出
                    </Button>,
                ]}
            >
                <p>確定要登出嗎？</p>                       
            </Modal>
        </>
    )
}

export default LogoutModal;



