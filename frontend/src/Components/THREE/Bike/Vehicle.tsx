
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
import { CylinderArgs, Triplet, useRaycastVehicle, WheelInfoOptions } from '@react-three/cannon'
import { useControls } from './hooks/useControls'
import Wheel from './Wheel+Pedals'
import BikeMesh from './Chassis'
import useWheels from './hooks/useWheels'
import { Mesh } from 'three'
import { BikeProps } from '.'
import useHandleControls from './hooks/useHandleControls'
import { Trail } from '@react-three/drei'
import useBikeContext from '../../../Containers/hooks/useBikeContext'
import useLocation from '../../../Containers/hooks/useLocation'
import useSound from './hooks/useSound'


/**
 * Chassis info
 */
const defaultChassisProps = {
	mass: 500,
	args: [1.3, 1.6, 4] as Triplet,
	// position: [0, -1.5, 0] as Triplet,
};

/**
 * Wheel info
 */
const radius = 0.66;
const wheelPosition = {
	radius,
	width: 1.2,
	height: -0.008,
	front: 1.23,
	back: -1.03,
};
const wheelProps = {
	mass: 10,
	args: [radius, radius, 0.35, 16] as CylinderArgs,
}

const numOfWheels = 6;  // [F, M, B, B, B]
const frontIndex = [0, 1];
const backIndex = [3, 5];

/**
 * Justify
 */
const justifyValue = 1;
const justifyPosition = (p: Triplet): Triplet => ([p[0], p[1] + justifyValue, p[2]]);


type ArcadeDirection = 'left' | 'right' | 'front';

/**
 * Component
 */
interface VehicleProps extends BikeProps { };
const Vehicle = forwardRef((props: VehicleProps, vehicle: RefObject<Mesh>) => {
	const { objectProps } = props;

	const chassis = useRef<any>(null!)
	const [wheelRefs, wheelInfos] = useWheels(
		{ numOfWheels, wheelPosition }) as [any[], WheelInfoOptions[]];

	const { location } = useLocation();
	useEffect(() => {

		console.log(objectProps);

		chassis!.current.api.position.set(...justifyPosition(objectProps.position));
		chassis!.current.api.rotation.set(...objectProps.rotation)
		chassis!.current.api.velocity.set(0, 0, 0)
		chassis!.current.api.angularVelocity.set(0, 0, 0)
	}, [location]);

	/**
	 * Physics
	 * - build the whole vehicle w/ chassis, wheelRef & infos
	 */
	// const vehicle = useRef(null!);
	const [, api] = useRaycastVehicle(() => ({
		chassisBody: chassis,
		wheels: wheelRefs,
		wheelInfos: wheelInfos,
		indexForwardAxis: 2,  // z=2
		indexRightAxis: 0,  // x=0
		indexUpAxis: 1,  // y=1
		...objectProps,
	}), vehicle);

	/**
	 * Motion:
	 * - control the vehicle based on "controls"
	 */
	const [arcadeDirection, setArcadeDirection] = useState<ArcadeDirection>('front');
	const controls = useControls()
	useHandleControls({
		controls, chassis, backIndex, frontIndex, api, setArcadeDirection,
		numOfWheels,
		objectProps: { ...objectProps, position: justifyPosition(objectProps.position) },
	})

	/**
	 * Sound
	 */
	const [speed, setSpeed] = useState<number>(0);
	useEffect(() => {
		return chassis!.current?.api.velocity.subscribe((v: Triplet) => {
			const norm = v.reduce((prev, cur) => (prev + cur * cur), 0)
			setSpeed(norm);
		});
	}, [chassis]);
	// useSound({ speed });


	/**
	 * Get Position
	 */
	const { setBikePosition } = useBikeContext();
	useEffect(() => {
		return chassis!.current?.api.position.subscribe((r: Triplet) => {
			setBikePosition(() => r);
		});
	}, [chassis]);

	return (
		// @ts-ignore
		< group ref={vehicle} >
			<BikeMesh
				ref={chassis}
				controls={controls}
				position={justifyPosition(objectProps.position)}
				rotation={objectProps.rotation}
				arcadeDirection={arcadeDirection}
				{...defaultChassisProps} />
			{
				wheelRefs.map((ref, i) => (
					<Wheel
						key={'wheel' + i}
						ref={ref}
						{...wheelProps}
						display={i == 4 ? 'back' : i == 2 ? 'pedal' : 'none'}
					/>
				))
			}
		</group >
	)
});

export default Vehicle

export type { ArcadeDirection };