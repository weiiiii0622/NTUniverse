import { Debug, Physics } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import Bench from "../../Components/THREE/static/Bench";
import Ground from "../../Components/THREE/static/Ground";
import Tree1 from "../../Components/THREE/static/Trees/Tree1";
import TestContainer from "./TestContainer";
import Palm from "../../Components/THREE/static/Palm";
import { FC } from "react";
import { Trail } from "@react-three/drei";

const DebugWorld: FC<any> = ({ children, debug = false }) => {
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

export default function World() {

	return (
		<Physics>
			<DebugWorld >
				<TestContainer />
				<Ground />
				<Tree1 position={[-5, 0.0, -5]} />
				{/* <RingElement ringPosition={[-5, 0.1, -5]} ringArgs={[4.5, 7, 32]} /> */}
				<Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} castShadow />
				<Bike objectProps={{
					position: [5, 0, 5],
					rotation: [0, -Math.PI * 3 / 4, 0],
				}} />
				<Palm objectProps={{
					position: [5, 0, -5],
				}} />
			</DebugWorld>
		</Physics >
	)
}