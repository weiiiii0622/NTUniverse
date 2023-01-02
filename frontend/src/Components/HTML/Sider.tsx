import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { useMyContext } from '../../Utils/useMyContext';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: () => void,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const MySider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isLogin, setIsLogin, loginModalOpen, setLoginModalOpen, setLogoutModalOpen, setProfileModalOpen, setAboutModalOpen, setBikeEnabled, me, setProfileUser } = useMyContext();

  const handleLogin = () => {
    //console.log("Login");
    setLoginModalOpen(true);
    setBikeEnabled(false);
  }

  const handleLogout = () => {
    //console.log("Logout");
    setLogoutModalOpen(true);
    setBikeEnabled(false);
  }

  const handleOpenProfile = () => {
    //console.log("Open Profile");
    setProfileUser(me['id']);
    setProfileModalOpen(true);
    setBikeEnabled(false);
  }

  const handleOpenAbout = () => {
    console.log("Open About");
    setAboutModalOpen(true);
    setBikeEnabled(false);
  }

  const items: MenuItem[] = [
    // 登入/登出
    isLogin ? getItem('登出', '1', <LoginOutlined />, handleLogout) : getItem('登入', '1', <LogoutOutlined />, handleLogin),
    
    // 關於
    getItem('關於', '2', <InfoCircleOutlined />, handleOpenAbout),
    
    // 個人資料
    isLogin ? getItem('個人資料', '3', <UserOutlined />, handleOpenProfile) : null,
   
    // 設定
    isLogin ? getItem('設定', '4', <SettingOutlined />, null) : null,
    //getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, null,[
    //   getItem('Tom', '3'),
    //   getItem('Bill', '4'),
    //   getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
  ];

  return (
    <Layout>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu 
          theme="dark" 
          onKeyDown={(e) => {
            if(e.code === "Enter"){
              console.log("Entered Sider");
              e.preventDefault();
            }
          }} 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={items}
        />
      </Sider>
      {/* <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> */}
    </Layout>
  );
};

export default MySider;