import { Debug, usePlane } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import { FC } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import { useControls } from "leva";
import MainLib, { MainLibPosition } from "./MainLib/MainLib";
import useBikeContext from "../hooks/useBikeContext";
import SFu from "./SFu";
import useTeleport from "../hooks/useTeleport";
import { Billboard, Box, Html, ScreenSpace, Text } from "@react-three/drei";


function GroundPhysic() {

	const [ref, api] = usePlane(() => ({
		type: "Static",
		material: 'ground',
		position: [0, 0, 0],
		args: [1000, 1000],
		rotation: [-Math.PI / 2, 0, 0],
	}))

	return (
		<mesh ref={ref as any} name="ground physics" />
	)
}

const DebugWorld: FC<any> = ({ debug = false, children }) => {
	return (
		<>{debug
			? <Debug> {children} </Debug>
			: <> {children} </>
		}</>
	)
}

function World() {

	const { setBulletinModalOpen, bikeTpPosition } = useMyContext()
	const { setBikeEnabled, setLocation } = useBikeContext();

	const { debug } = useControls('General', {
		debug: true,
	});

	const { handleTP } = useTeleport();

	const handleOpenBulletin = ({ location }) => {
		setLocation(location);
		setBikeEnabled(false);
		setBulletinModalOpen(true);
	}

	return (
		<DebugWorld debug={debug} >

			<Bike objectProps={{
				position: bikeTpPosition,
				rotation: [0, 0, 0],
			}} />
			<GroundPhysic />

			<MainLib />
			<SFu />

			<Html style={{
				position: 'absolute',
			}}>
				Hi I am abs
			</Html>
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

