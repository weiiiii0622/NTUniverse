import { Debug, useBox, useCompoundBody, useSphere } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import Ground from "../../Components/THREE/static/Ground";
import { FC } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import TestContainer from "./TestContainer";
import { type } from "os";
import Platform from "./Platform";
import Boundary from "./Boundary";
import { useControls } from "leva";

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

function TestBox() {
	const [ref, api] = useBox(() => ({
		type: "Static",
		args: [5, 5, 5],
		position: [10, 10, 10],
		mass: 1000,
		onCollide: () => console.log('ji')
	}));

	return (
		<>
			<mesh ref={ref as any}>
				<boxGeometry />
				<meshBasicMaterial />
			</mesh>
		</>
	)
}

function World() {

	const { setBikeEnabled, setBulletinModalOpen, isLogin, setIsLogin, setLocation } = useMyContext()

	// const { show } = useControls({ show: true });

	return (
		<DebugWorld debug >
			<Bike objectProps={{
				position: [0, 5, 0],
				rotation: [0, 0, 0],
			}} />
			<Ground />
			<mesh >
				<boxGeometry />
				<meshBasicMaterial />

			</mesh>
			{/* <Tree1 position={[-5, 0.0, -5]} /> */}
			{/* <RingElement ringPosition={[-5, 0.1, -5]} ringArgs={[4.5, 7, 32]} /> */}
			{/* <Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} castShadow /> */}

			{/* <TestContainer /> */}

			{/* <Palm objectProps={{
					position: [5, 0, -5],
				}} /> 

                {/* Pass in your EventHandler to handleEvent={ } */}
			{/* <InteractiveBlock
				handleEvent={() => {
					setLocation("總圖");
					setBikeEnabled(false);
					setBulletinModalOpen(true);
				}}
				position={[5, 0, 5]}
			/>
			<InteractiveBlock
				handleEvent={() => {
					setLocation("醉月湖");
					setBikeEnabled(false);
					setBulletinModalOpen(true);
				}}
				position={[5, 0, -5]}
			/> */}

		</DebugWorld >
	)
}

export default World;