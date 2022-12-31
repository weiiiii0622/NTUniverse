import { Debug, Physics } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import Bench from "../../Components/THREE/static/Bench";
import Ground from "../../Components/THREE/static/Ground";
import Tree1 from "../../Components/THREE/static/Trees/Tree1";
import TestContainer from "./TestContainer";
import Palm from "../../Components/THREE/static/Palm";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import { FC } from "react";
import { useMyContext } from "../../Utils/useMyContext";

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

	const { setBikeEnabled, setBulletinModalOpen, isLogin, setIsLogin } = useMyContext();

	return (
		<DebugWorld >
			<Ground />
			{/* <Tree1 position={[-5, 0.0, -5]} /> */}
			{/* <RingElement ringPosition={[-5, 0.1, -5]} ringArgs={[4.5, 7, 32]} /> */}
			{/* <Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} castShadow /> */}
			<Bike objectProps={{
				position: [0, 0, 0],
				rotation: [0, 0, 0],
			}} />

			{/* <Palm objectProps={{
					position: [5, 0, -5],
				}} />

                {/* Pass in your EventHandler to handleEvent={ } */}
			<InteractiveBlock handleEvent={() => { setBikeEnabled(false); setBulletinModalOpen(true); }} position={[5, 0, 5]} />
		</DebugWorld>
	)
}

export default World;