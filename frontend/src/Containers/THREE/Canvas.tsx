import { Physics, Triplet } from "@react-three/cannon";
import { AdaptiveDpr, AdaptiveEvents, ContactShadows, Environment, Html, OrbitControls, softShadows, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { createContext, useState, useEffect, Suspense } from "react";
import Lights from "../../Components/THREE/scene/Lights";
import AppOrbitControls from "../../Components/THREE/scene/OrbitControls";
import AppSky from "../../Components/THREE/static/Sky";
import { SetStateType } from "../../Utils/type";
import { useMyContext } from "../../Utils/useMyContext";
import MainLib from "./MainLib/MainLib";
import World from "./World";
import Loader from "./Loader";
import SFu from "./SFu";
import useBikeContext from "../hooks/useBikeContext";
import TutorialModal from "../../Components/HTML/TutorialModal";
import BulletinModal from "../../Components/HTML/BulletinModal";
import AboutModal from "../../Components/HTML/AboutModal";
// import { } from 'three/examples/fonts/helvetiker_regular.typeface.json';
//import { Loader } from "@react-three/drei";

interface IContext {
	/**
	 * Bike
	 */

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

softShadows({
	frustum: 3.75,
	size: 0.005,
	near: 9.5,
	samples: 20,
	rings: 11
});



export default function AppCanvas() {

	/**
	 * Bike
	 */
	const [bikeControlling, setBikeControlling] = useState<boolean>(true);
	const [helpers, setHelpers] = useState<boolean>(false);

	const { enableControls } = useControls('General', {
		enableControls: false,
	});
	const { enableBike } = useControls('General', { enableBike: true, });
	const { setBikeEnabled } = useBikeContext();
	useEffect(() => {
		setBikeEnabled(enableBike);
	}, [enableBike]);

	return (
		<>
			<Leva/>
			{/* <Loader /> */}
			<Canvas
				style={{ position: 'unset', margin: 0 }}
				shadows
			>
				<Suspense fallback={<Loader />}>
					<>
						<Html>
						</Html>
						<Environment files="./env.hdr" background>
						</Environment>
						{/* <Perf position="bottom-right" /> */}
						{/* <Shadow /> */}
						<Lights />
						{helpers && <>
							<axesHelper args={[10]} />
							<gridHelper />
						</>}
						{/* <AppSky /> */}
						<ThreeContext.Provider value={{
							bikeControlling,
							setBikeControlling,
							helpers,
							setHelpers,
							enableControls,
							setEnableControls: () => { },
						}}>

							<Physics>
								<World />
							</Physics>

						</ThreeContext.Provider>
						<AdaptiveDpr pixelated />
						<AdaptiveEvents />
					</></Suspense>
			</Canvas >
		</>
	)
}

export { ThreeContext };