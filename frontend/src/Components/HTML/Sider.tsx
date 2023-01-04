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
import { Button, Divider, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { useMyContext } from '../../Utils/useMyContext';
import useBikeContext from '../../Containers/hooks/useBikeContext';
import AppCanvas from '../../Containers/THREE/Canvas';

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

	const { isLogin, setIsLogin, loginModalOpen, setLoginModalOpen, setLogoutModalOpen, setProfileModalOpen, setAboutModalOpen, me, setProfileUser } = useMyContext();
	const { setBikeEnabled } = useBikeContext();

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
		//console.log("Open About");
		setAboutModalOpen(true);
		setBikeEnabled(false);
	}

	const items: MenuItem[] = [
		// 登入/登出
		isLogin ? getItem('登出', '1', <LoginOutlined />, handleLogout) : getItem('登入', '1', <LogoutOutlined />, handleLogin),


		// 個人資料
		isLogin ? getItem('個人資料', '2', <UserOutlined />, handleOpenProfile) : null,

		// 設定
		getItem('設定', '3', <SettingOutlined />, null),

		// 關於
		getItem('關於', '4', <InfoCircleOutlined />, handleOpenAbout),

	];

	return (
		<Sider
			// collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			theme='light'
		// style={{
		//   overflow: 'auto',
		//   height: '100vh',
		//   position: 'absolute',
		//   left: 0,
		//   top: 0,
		//   bottom: 0,
		//   zIndex: '50',
		// }}
		>
			<div style={{ margin: 16 }} >
				<img src='./logo.svg' alt='NTUniverse' style={{
					maxHeight: '100%',
					maxWidth: '100%'
				}} />
			</div>

			<Layout>
				<Menu
					// theme="dark"
					onKeyDown={(e) => {
						if (e.code === "Enter") {
							//console.log("Entered Sider");
							e.preventDefault();
						}
					}}
					defaultSelectedKeys={['1']}
					mode="inline"
					items={items}
				/>
			</Layout>
		</Sider >
	);
};

export default MySider;