import { Debug, Triplet } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import Ground from "../../Components/THREE/static/Ground";
import { FC, useState } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import { useControls } from "../../Components/THREE/Beetle (unused)/useControls";

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


function World() {

	const { bikeTpPosition, setBikeTpPosition,setBikeEnabled, setBulletinModalOpen, isLogin, setIsLogin, setLocation, setIsChangeScene } = useMyContext();
	const controls = useControls();
	let { reset } = controls.current;


	return (
		<DebugWorld >
			<Ground />
			{/* <Tree1 position={[-5, 0.0, -5]} /> */}
			{/* <RingElement ringPosition={[-5, 0.1, -5]} ringArgs={[4.5, 7, 32]} /> */}
			{/* <Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} castShadow /> */}
			<Bike objectProps={{
				position: bikeTpPosition,
				rotation: [0, 0, 0],
			}} />

			{/* <Palm objectProps={{
					position: [5, 0, -5],
				}} />

                {/* Pass in your EventHandler to handleEvent={ } */}
			<InteractiveBlock
				handleEvent={() => {
					setIsChangeScene(true);
					setBikeEnabled(false);
					setTimeout(() => {
						setBikeTpPosition([5, 0 ,-5]);
						setBikeEnabled(true);
					}, 1000);
					// setLocation("總圖");
					// setBikeEnabled(false);
					// setBulletinModalOpen(true);
				}}
				position={[5, 0, 5]}
			/>
			<InteractiveBlock
				handleEvent={() => {
					setIsChangeScene(true);
					setBikeEnabled(false);
					setTimeout(() => {
						setBikeTpPosition([5, 0 ,5]);
						setBikeEnabled(true);
					}, 1000);
					// setLocation("醉月湖");
					// setBikeEnabled(false);
					// setBulletinModalOpen(true);
				}}
				position={[5, 0, -5]}
			/>
		</DebugWorld>
	)
}

export default World;