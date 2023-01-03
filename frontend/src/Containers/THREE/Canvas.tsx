import { Physics, Triplet } from "@react-three/cannon";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { createContext, useState, useEffect, Suspense } from "react";
import Lights from "../../Components/THREE/scene/Lights";
import AppOrbitControls from "../../Components/THREE/scene/OrbitControls";
import AppSky from "../../Components/THREE/static/Sky";
import { SetStateType } from "../../Utils/type";
import { useMyContext } from "../../Utils/useMyContext";
import SFu from "./Demo";
import World from "./World";
import Loader from "./Loader";
//import { Loader } from "@react-three/drei";

interface IContext {
	/**
	 * Bike
	 */
	bikePosition: Triplet,
	setBikePosition: SetStateType<Triplet>,
	bikeControlling: boolean,
	setBikeControlling: SetStateType<Boolean>,

	/**
	 * Helpers
	 */
	helpers: boolean,
	setHelpers: SetStateType<boolean>,

	/**
	 * Controls
	 */
	enableControls: boolean,
	setEnableControls: SetStateType<boolean>,
};

const ThreeContext = createContext<IContext>({
	/**
	 * Bike
	 */
	bikePosition: [0, 0, 1],
	setBikePosition: (r) => { },
	bikeControlling: false,
	setBikeControlling: (x) => { },

	/**
	 * Helpers
	 */
	helpers: false,
	setHelpers: (h) => { },

	/**
	 * Controls
	 */
	enableControls: false,
	setEnableControls: (e) => { },
});

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 20,
//     rings: 11
// });



export default function AppCanvas() {

	/**
	 * Bike
	 */
	const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
	const [bikeControlling, setBikeControlling] = useState<boolean>(true);
	const [helpers, setHelpers] = useState<boolean>(false);
	// const [enableControls, setEnableControls] = useState<boolean>(true);

	const { enableControls } = useControls({
		enableControls: true,
	});
	const { enableBike } = useControls({ enableBike: true, });
	const { setBikeEnabled } = useMyContext();
	useEffect(() => {
		setBikeEnabled(enableBike);
	}, [enableBike]);

	return (
		<>
		{/* <Loader /> */}
		<Canvas
			style={{ position: 'unset' }}
			shadows
		>
			<Suspense fallback={<Loader /> }>
			<>
				<Perf position="bottom-right" />

				{/* <Shadow /> */}
				<Lights />
				{helpers && <>
					<axesHelper args={[10]} />
					<gridHelper />
				</>}

				<AppSky />
				{/* <Environment */}
				{/* files={'./env.hdr'}
				// background
				> */}
				{/* <color args={['#F8EEDC']} attach='background' /> */}
				{/* <color args={['#1dc5a9']} attach='background' /> */}
				{/* <color args={['#ff0000']} attach='background' /> */}
				{/* <color args={['#A2B4C2']} attach='background' /> */}
				{/* </Environment> */}

				{/* <Environment background>
					<color args={['#0b1f2c']} attach='background' />
				</Environment> */}

				<ThreeContext.Provider value={{
					bikePosition,
					setBikePosition,
					bikeControlling,
					setBikeControlling,
					helpers,
					setHelpers,
					enableControls,
					setEnableControls: () => { },
				}}>
					<SFu />
					<Physics>
						<World />
					</Physics>
					{/* <Camera track={track} /> */}
					{/* <TestCam /> */}
					<AppOrbitControls enabled={enableControls} />

				</ThreeContext.Provider>
				<AdaptiveDpr pixelated />
				<AdaptiveEvents />			
			</>
			</Suspense>
		</Canvas >
		</>
	)
}

export { ThreeContext };