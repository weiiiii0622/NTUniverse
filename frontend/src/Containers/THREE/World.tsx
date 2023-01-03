import { Debug, Triplet, useBox, useCompoundBody, usePlane, useSphere } from "@react-three/cannon";
import Bike, { ObjectProps } from "../../Components/THREE/Bike";
import Ground from "../../Components/THREE/static/Ground";
import { FC, useState } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import TestContainer from "./TestContainer";
import { type } from "os";
import { useControls } from "leva";
import SFuCollisionBox from "./SFu/physics/SFuCollisionBox";
import { Center, Html, Text } from "@react-three/drei";
import { Euler } from "three";
import { group } from "console";
import { useSpring, animated, config } from "@react-spring/three";
import { Tooltip } from "antd";

import { MainLibPosition } from "./MainLib/MainLib";

const DebugWorld: FC<any> = ({ debug = false, children }) => {
	return (
		<>{debug
			? <Debug> {children} </Debug>
			: <> {children} </>
		}</>
	)
}


function World() {

	const { setFinish, bikeTpPosition, setBikeTpPosition, isChangingScene, setIsChangeScene, setBikeEnabled, setBulletinModalOpen, isLogin, setIsLogin, setLocation } = useMyContext()

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

	// const {show}

	return (
		<DebugWorld debug >
			<Bike objectProps={{
				position: bikeTpPosition,
				rotation: [0, 0, 0],
			}} />

			<Ground />

			{/* Pass in your EventHandler to handleEvent={ } */}
			<InteractiveBlock
				handleEvent={() => {
					handleTP({
						scene: '幹你老師',
						pos: [0, 0, 15]
					})
				}}
				position={[0, 0, -15]}
			/>
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
			<InteractiveBlock
				handleEvent={() => {
					handleTP({
						scene: '總圖',
						pos: MainLibPosition
					})
				}}
				position={[0, 0, 25]}
			/>

		</DebugWorld >
	)
}

export default World;

