import { Debug, usePlane } from "@react-three/cannon";
import Bike from "../../Components/THREE/Bike";
import { FC, useEffect, useMemo } from "react";
import { useMyContext } from "../../Utils/useMyContext";
import InteractiveBlock from "../../Components/THREE/interaction/InteractiveBlock";
import { useControls } from "leva";
import MainLib, { MainLibPosition } from "./MainLib/MainLib";
import useBikeContext from "../hooks/useBikeContext";
import SFu from "./SFu";
import useTeleport from "../../Utils/useEvent";
import { Billboard, Box, Html, ScreenSpace, Text } from "@react-three/drei";
import useLocation from "../hooks/useLocation";


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
		<>
			{debug
				? <Debug>{children}</Debug>
				: <>{children}</>
			}
		</>
	)
}

function World() {

	const { setBulletinModalOpen } = useMyContext()
	const { setBikeEnabled } = useBikeContext();
	const { location, setLocation, locationInfos } = useLocation();

	useEffect(() => {
		//console.log(location);
	}, [location]);

	const displayScene = () => {
		const position = locationInfos[location].position;
		switch (location) {
			case 'MainLib':
				return <MainLib position={position} />
			case 'SFu':
				return <SFu position={position} />
		}
	}

	const { debug } = useControls('General', {
		debug: false,
	});

	return (
		<DebugWorld debug={debug} >
			<Bike objectProps={{
				position: locationInfos[location].position,
				rotation: locationInfos[location].rotation,
			}} />
			<GroundPhysic />

			{displayScene()}

		</DebugWorld >
	)
}

export default World;

