
import React, { useEffect, useRef, useState } from 'react'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { CylinderArgs, Debug, Triplet, useRaycastVehicle, WheelInfoOptions } from '@react-three/cannon'
import { useControls } from './useControls'
import Wheel from './Wheel'
import BikeMesh from './BikeMesh'
import useWheels from './useWheels'
import { Mesh } from 'three'
import { BikeProps } from '.'
import ModelFBX from '../models/ModelFBX'
import FrontWheel from './FrontWheel'
import { degToRad } from 'three/src/math/MathUtils'


/**
 * Chassis info
 */
const defaultChassisProps = {
	mass: 500,
	args: [1.3, 1.6, 4] as Triplet,
	// position: [0, 1.5, 0] as Triplet,
};

/**
 * Wheel info
 */
const defaultWheelProps = {
	radius: 0.66,
	width: 1.2,
	height: -0.008,
	front: 1.23,
	back: -1.03,
	args: [0.66, 0.66, 0.5, 16] as CylinderArgs,
};
const { radius } = defaultWheelProps;

const numOfWheels = 6;
const frontIndex = [0, 1, 2];
const backIndex = [3, 4, 5];


/**
 * Dynamics
 */
const steer = 1;
const force = 1000;
const maxBrake = 1e5;

/**
 * Justify
 */
const justifyValue = 1.5;
const justifyPosition = (p: Triplet): Triplet => ([p[0], p[1] + justifyValue, p[2]]);

/**
 * Component
 */
interface VehicleProps extends BikeProps {
	// objectProps?: Object3DProps,
};
function Vehicle(props: VehicleProps) {
	const { objectProps } = props;

	const chassis = useRef<any>(null!)
	const [wheelRefs, wheelInfos] = useWheels(
		{ numOfWheels, wheelProps: defaultWheelProps }) as [any[], WheelInfoOptions[]];

	/**
	 * Physics
	 * - build the whole vehicle w/ chassis, wheelRef & infos
	 */
	const [vehicle, api] = useRaycastVehicle(() => ({
		chassisBody: chassis,
		wheels: wheelRefs,
		wheelInfos: wheelInfos,
		indexForwardAxis: 2,  // z=2
		indexRightAxis: 0,  // x=0
		indexUpAxis: 1,  // y=1
		// ...objectProps,
	}))

	/**
	 * Motion:
	 * - control the vehicle based on "controls"
	 */
	const [arcadeDirection, setArcadeDirection] = useState<'front' | 'left' | 'right'>('front');

	const controls = useControls()
	useFrame(() => {
		const { forward, backward, left, right, brake, reset } = controls.current
		backIndex.forEach(i =>
			api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, i))
		frontIndex.forEach(i =>
			api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, i));
		backIndex.forEach(i =>
			api.setBrake(brake ? maxBrake : 0, i));

		if (left && !right)
			setArcadeDirection('left');
		else if (right)
			setArcadeDirection('right');
		else
			setArcadeDirection('front');

		if (reset) {
			chassis!.current.api.position.set(...justifyPosition(objectProps.position))
			if (objectProps.rotation)
				chassis!.current.api.rotation.set(...objectProps.rotation)
			else
				chassis!.current.api.rotation.set(0, 0, 0)
			chassis!.current.api.velocity.set(0, 0, 0)
			chassis!.current.api.angularVelocity.set(0, 0, 0)
		}
	})

	/**
	 * Front Wheel
	 */
	const [frontPosition, setFrontPosition] = useState<Triplet>([0, 0, 0]);
	const [frontRotation, setFrontRotation] = useState<Triplet>([0, 0, 0]);
	const [angularVelocity, setAngularVelocity] = useState<Triplet>([0, 0, 0,]);
	const delta: Triplet = [0, defaultWheelProps.height - 0.24, defaultWheelProps.front];
	useEffect(() => {
		return chassis.current.api.position.subscribe((r: Triplet) => setFrontPosition(r));
	}, [chassis]);
	useEffect(() => {
		return chassis.current.api.rotation.subscribe((r: Triplet) => setFrontRotation(r));
	}, [chassis]);

	// This code is not working -- the angular velocity just says [0,0,0]
	useEffect(() => {
		// console.log(wheelRefs[5].current);
		return wheelRefs[5]!.current?.api?.angularVelocity.subscribe((w: Triplet) => { console.log(w) });
	}, []);

	return (
		<Debug>
			<group ref={vehicle}>
				<BikeMesh
					ref={chassis}
					position={justifyPosition(objectProps.position)}
					rotation={objectProps.rotation}
					justifyValue={justifyValue}
					arcadeDirection={arcadeDirection}
					{...defaultChassisProps} />
				{
					wheelRefs.map((ref, i) => (
						<Wheel
							key={'wheel' + i}
							ref={ref}
							args={defaultWheelProps.args}
							wheelProps={defaultWheelProps}
							isBack={i == 4}
							arcadeDirection={arcadeDirection} />
					))
				}
				<FrontWheel
					objectProps={{
						position: frontPosition,
						rotation: frontRotation,
					}}
					delta={delta}
					arcadeDirection={arcadeDirection}
					angularVelocity={angularVelocity}
				/>
			</group >
		</Debug>
	)
}

export default Vehicle
