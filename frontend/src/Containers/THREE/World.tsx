import { Debug, Triplet, useBox, useCompoundBody, useSphere } from "@react-three/cannon";
import Bike, { ObjectProps } from "../../Components/THREE/Bike";
import Ground from "../../Components/THREE/static/Ground";
import { FC, useState } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import TestContainer from "./TestContainer";
import { type } from "os";
import { useControls } from "leva";
import SFuCollisionBox from "./SFu/SFuCollisionBox";
import { Center, Html, Text } from "@react-three/drei";
import { Euler } from "three";
import { group } from "console";
import { useSpring, animated, config } from "@react-spring/three";
import { Tooltip } from "antd";

import { MainLibPosition } from "./MainLib/MainLib";

const DebugWorld: FC<any> = ({ debug = false, children }) => {

	return (
		<>
			{debug
				? <Debug>
					{children}
				</Debug>
				: <>
					{children}
				</>
			}
		</>
	)
}

interface QuestionMarkProps {
	rotation?: Triplet,
	autoRotate?: boolean,
	position: Triplet,
	color?: string,
};
function QuestionMark({
	rotation,
	position,
	autoRotate,
	color = '#ca9560',
}: QuestionMarkProps) {

	const { angle } = useSpring({
		from: {
			angle: [0, 0, 0],
		},
		to: {
			angle: [0, Math.PI * 2, 0],
		},
		config: {
			tension: 120,
			friction: 14,
			mass: 2,
		},
		loop: true,
		delay: 100,
	});

	return (
		<group {...{ rotation, position }}>
			<Center>
				<Html
					center
					style={{
						color: 'transparent',
						fontSize: 10,
						textAlign: 'center',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Tooltip title="test content">
						<div>bufferText</div>
					</Tooltip>
				</Html>
			</Center>


			<animated.mesh rotation={angle as any}>
				<mesh
					scale={0.1}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<mesh receiveShadow>
						<cylinderGeometry args={[2, 2, 0.5, 32]} />
						<meshStandardMaterial
							color={color}
						/>
					</mesh>
					<Text
						font="./fonts/burnfont-1.2.otf"
						fontSize={2}
						color="#ffefc5"
						position={[0, 0.265, 0]}
						textAlign='center'
						rotation={[Math.PI / 2, Math.PI, 0]}
						castShadow
					>
						？
					</Text>
					<Text
						font="./fonts/burnfont-1.2.otf"
						fontSize={2}
						color="#ffefc5"
						position={[0, -0.265, 0]}
						textAlign='center'
						rotation={new Euler(Math.PI / 2, 0, 0, 'YXZ')}
						castShadow
					>
						？
					</Text>
				</mesh>
			</animated.mesh>
		</group>
	)
}

function World() {

	const { setFinish, bikeTpPosition, setBikeTpPosition, isChangingScene, setIsChangeScene, setBikeEnabled, setBulletinModalOpen, isLogin, setIsLogin, setLocation } = useMyContext()

	const { width, center, height } = useControls({
		width: 5,
		height: 10,
		center: {
			value: {
				x: 0,
				y: 0,
				// z: 0,
			},
			step: 0.5
		}
	});

	const { pos, y } = useControls('question', {
		pos: {
			value: {
				x: 5.5,
				z: 5.1,
			},
			step: 0.5,
		},
		y: {
			value: 7.5,
			step: 0.5,
		}
	});
	const handleTP = ({ scene, pos }) => {
		setIsChangeScene({ scene: scene });
		setBikeEnabled(false);
		setTimeout(() => {
			setBikeTpPosition(pos);
			setBikeEnabled(true);
		}, 2000);
	}

	const handleOpenBulletin = ({ location }) => {
		setLocation(location);
		setBikeEnabled(false);
		setBulletinModalOpen(true);
	}

	return (
		<DebugWorld debug >
			<Bike objectProps={{
				position: [0, 0, 0],
				rotation: [0, 0, 0],
			}} />

			<SFuCollisionBox />
			<Ground />

			<QuestionMark
				position={[pos.x, y, pos.z]}
				rotation={[0, Math.PI / 4, 0]}
			/>

			{/* Pass in your EventHandler to handleEvent={ } */}
			<InteractiveBlock
				handleEvent={() => {
					handleTP({
						scene: '總圖',
						pos: MainLibPosition
					})
				}}
				position={[0, 0, 0]}
			/>
			<InteractiveBlock
				handleEvent={() => {
					handleTP({
						scene: '幹你老師',
						pos: [0, 0, 15]
					})
				}}
				position={[0, 0, -15]}
			/>
			{/* <Tree1 position={[-5, 0.0, -5]} /> */}
			{/* <RingElement ringPosition={[-5, 0.1, -5]} ringArgs={[4.5, 7, 32]} /> */}
			{/* <Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} castShadow /> */}

			{/* <TestContainer /> */}

			{/* <Palm objectProps={{
				 	position: [5, 0, -5],
				 }}   */}

			{/* Pass in your EventHandler to handleEvent={ } */}
			<InteractiveBlock
				handleEvent={() => {
					handleTP({
						scene: '操你媽',
						pos: [0, 0, -15]
					})
				}}
				position={[0, 0, 15]}
			/>

			<InteractiveBlock
				handleEvent={() => {
					handleOpenBulletin({
						location: "小福廣場",
					})
				}}
				position={[15, 0, 0]}
			/>

		</DebugWorld >
	)
}

export default World;

export { QuestionMark }; 