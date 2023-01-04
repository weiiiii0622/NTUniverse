import { useState, useEffect, useRef } from 'react';
import { animated, config, useSpring } from '@react-spring/web'
import {
	Card,
	Row,
	Progress,
	Layout,
	theme,
	Drawer
} from 'antd';

import { useMyContext } from '../../Utils/useMyContext';
import styled from 'styled-components';
import Column from 'antd/es/table/Column';
import Sider from 'antd/es/layout/Sider';
import './LoadingCover.css';
import FancyBtn from './components/FancyBtn';

const usePercent = () => {

	const { isLoading } = useMyContext();

	const [percent, setPercent] = useState<number>(0);

	const increase = (val) => {
		setPercent((prevPercent) => {
			const newPercent = prevPercent + val;;
			if (newPercent > 100) {
				return 100;
			}
			return newPercent;
		});
	};

	useEffect(() => {
		//console.log(`isLoading: ${isLoading}`);
		if (isLoading === true) {
			setTimeout(() => {
				for (var i = 1; i <= 10; i++) {
					if (i != 10) {
						setTimeout(() => {
							increase(10);
						}, 200 * i);
					}
					else {
						setTimeout(() => {
							increase(9);
						}, 200 * i);
					}
					//increase(99);
				}
			}, 1000)
		}
		else {
			setTimeout(() => {
				increase(1);
			}, 3000 * 1);
		}
	}, [isLoading])

	return { percent };
}



const LoadingCover = () => {

	const {
		setIsChangeScene,
		setLoadFinished,
		setTutorialModalOpen
	} = useMyContext();
	const [showButton, setShowButton] = useState<boolean>(false);

	const { percent } = usePercent();
	useEffect(() => {
		if (percent === 100) {
			setShowButton(true);
		}
	}, [percent])


	const [videoLoaded, setVideoLoaded] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { opacity, x, height } = useSpring({
		opacity: videoLoaded ? 1 : 0,
		x: videoLoaded ? 530 : 0,
		height: videoLoaded ? '120%' : '40%',
		width: videoLoaded ? '25%' : '30%',
		config: {
			mass: 5,
			tension: 150,
			damping: 5,
		}
	});
	const videoRate = 1;
	const videoRef = useRef<HTMLVideoElement>(null!);

	useEffect(() => {
		//console.log(percent)
	}, [percent]);

	const handleStart = () => {
		setIsChangeScene({ scene: '小福廣場' });
		setTimeout(() => {
			setDrawerOpen(false);
		}, 500)
		setTimeout(() => {
			setLoadFinished(true);
		}, 2000)
		setTimeout(() => {
			setTutorialModalOpen(true);
		}, 3300)
	};

	return (
		<div
			style={{
				position: 'absolute',
				background: "linear-gradient(to top, rgba(234, 210, 170, 1) 0%, rgba(207, 166, 149, 1) 100%)",
				// backgroundColor: 'black',
				width: '100%',
				height: '100%',
				zIndex: '100',
				overflow: 'hidden',
			}}
		>

			<animated.video src='/videos/overlook.mkv' autoPlay loop muted
				onCanPlay={(e) => {
					if (videoLoaded)
						return;
					setVideoLoaded(true);
					setDrawerOpen(true);
					videoRef.current.playbackRate = videoRate;
				}}
				ref={videoRef}
				style={{
					position: 'absolute',
					opacity,
					left: '-10%',
					top: '5%',
					height: '100%',
				}}
			/>
			<Drawer
				bodyStyle={{
					backgroundColor: '#fffbef',
					color: "#DB9D7F",
					// color: 'white',
					gap: 15
				}}
				placement='right'
				open={drawerOpen}
				mask={false}
				closable={false}
			>
				<div style={{ height: "28.75%" }} />
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					fontFamily: 'bauhaus',
					justifyContent: 'center',
					// height: '50%',
					gap: 20,
				}}>
					<img src="/logo.svg" width={'30%'} />
					<div style={{
						fontSize: '2em',
						letterSpacing: 3,
						marginBottom: 10
					}}>NTUniverse</div>
					<Row
						style={{ height: '100%' }}
						justify={'center'}
						align={'middle'}>
						{percent < 100
							? <Progress
								className='progress'
								type="circle"
								percent={percent}
								style={{
									color: 'red', cursor: 'wait'
								}}
								size={'small'}
								strokeWidth={4.5}
								strokeColor={{ '0%': '#DBCE85', '100%': '#DBCE85' }}
							/>
							: <FancyBtn onClick={handleStart} />
						}
					</Row>
				</div>
				<div style={{ height: "20%" }} />
			</Drawer>
		</div>
	)
}

export default LoadingCover;



